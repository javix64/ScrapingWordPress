export function extractDomain(url: string): string {
  const domainWithParams = url.replace(/(^\w+:|^)\/\//, "");
  const parts = domainWithParams.split("/")[0];
  const domainWithoutParams = parts.split("?")[0];
  return domainWithoutParams;
}

export function validateUrl(url: string): string {
  if (!url) return "Please enter a valid url";
  if (!url.startsWith("https://") || url.startsWith("http://"))
    return "Url should start by: http:// or https://";
  return url;
}
