# Homepage AWS edge infra (CDK)

> ⚠️ This `infra/` dir currently holds **both** the legacy Azure Bicep
> (`main.bicep`, `modules/`, `README.md`) and this AWS CDK app
> (`cdk.json`, `bin/app.ts`). They coexist during the Azure→AWS migration;
> once AWS is verified and Azure retired, remove the Bicep files (or move CDK
> to `infra/aws/`).

CDK app that deploys the CloudFront edge (+ optional observability) in front of
the Homepage ECS Express service, via `EcsExpressEdgeStack` from `cicd-toolkit`.

- **DNS is on Cloudflare** — this stack never uses Route53.
- CloudFront origin is the ECS Express `.on.aws` endpoint (HTTPS).
- Deployed by `.github/workflows/deploy-aws.yml` (config lives there).

## Custom domain on Cloudflare (via the Cloudflare MCP server)

1. **ACM cert (us-east-1).** Mint a DNS-validated cert for `kota.dog`. Using the
   **Cloudflare MCP server**, add the ACM validation `CNAME` to the `kota.dog`
   zone and leave it (needed for auto-renewal). Pass the issued cert ARN to the
   deploy: `-c certificateArn=arn:aws:acm:us-east-1:...` (importing a
   pre-validated cert keeps CI from blocking on validation).
2. **Point the domain at CloudFront.** After deploy, read the
   `DistributionDomain` output and, via the Cloudflare MCP server, create
   `CNAME kota.dog -> <DistributionDomain>` — **DNS-only (grey cloud)**; don't
   proxy (CloudFront already fronts it). For the apex, enable Cloudflare CNAME
   flattening.

## Smoke test (no domain)

`workflow_dispatch` with `custom_domain=false` deploys on the
`dXXXX.cloudfront.net` URL only — no ACM, no DNS.
