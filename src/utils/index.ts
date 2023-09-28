export function extractDomain(url: string): string {
  const domainWithParams = url.replace(/(^\w+:|^)\/\//, "");
  const parts = domainWithParams.split("/")[0];
  const domainWithoutParams = parts.split("?")[0];
  return domainWithoutParams;
}
