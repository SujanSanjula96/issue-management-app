import ballerina/os;

public string issuer = check getValueFromEnvVariables("ISSUER", "https://api.asgardeo.io/t/<org>/oauth2/token");
public string audience = check getValueFromEnvVariables("AUDIENCE", "");
public string jwksUrl = check getValueFromEnvVariables("JWKS_URL", "https://api.asgardeo.io/t/<org>/oauth2/jwks");
public int port = check int:fromString(check getValueFromEnvVariables("PORT", "9090"));

function getValueFromEnvVariables(string variable, string defaultValue) returns string {
    string value = os:getEnv(variable);
    return value != "" ? value : defaultValue;
}
