#!/usr/bin/env node
/**
 * Edge infrastructure for Homepage's ECS Express deployment.
 *
 * The ECS Express service + ALB are created by the deploy workflow
 * (`.github/workflows/deploy-aws.yml`). This CDK app only owns the edge:
 * CloudFront + ACM + Route53 + a CloudWatch dashboard, via the shared
 * `EcsExpressEdgeStack` from cicd-toolkit.
 *
 * All config is supplied as CDK context by the workflow (-c key=value), so the
 * account/domain/service live in the consuming workflow, not here:
 *   account, region, albDns (required),
 *   domainName, hostedZoneName, serviceName (custom domain),
 *   loadBalancerFullName, targetGroupFullName, ecsClusterName, ecsServiceName
 *   (dashboard detail).
 */
import * as cdk from 'aws-cdk-lib';
import { EcsExpressEdgeStack } from 'cicd-toolkit';

const app = new cdk.App();
const ctx = (k: string): string | undefined => app.node.tryGetContext(k);

const account = ctx('account') ?? process.env.CDK_DEFAULT_ACCOUNT;
const region = ctx('region') ?? process.env.CDK_DEFAULT_REGION ?? 'us-east-1';
const albDnsName = ctx('albDns');

if (!account) throw new Error('Pass -c account=<id> (or set CDK_DEFAULT_ACCOUNT).');
if (!albDnsName) throw new Error('Pass -c albDns=<ecs-express-endpoint>.');

new EcsExpressEdgeStack(app, 'HomepageEdge', {
  env: { account, region },
  albDnsName,
  domainName: ctx('domainName'),
  hostedZoneName: ctx('hostedZoneName'),
  serviceName: ctx('serviceName') ?? 'homepage',
  loadBalancerFullName: ctx('loadBalancerFullName'),
  targetGroupFullName: ctx('targetGroupFullName'),
  ecsClusterName: ctx('ecsClusterName'),
  ecsServiceName: ctx('ecsServiceName'),
});
