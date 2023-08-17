import ballerina/http;
import ballerina/uuid;

table<Issue> key(id) issuesTable = table[];

@http:ServiceConfig {
    cors: {
        allowOrigins: ["*"],
        allowCredentials: true,
        maxAge: 84900
    },
    auth: [
        {
            jwtValidatorConfig: {
                issuer: issuer,
                audience: audience,
                signatureConfig: {
                    jwksConfig: {
                        url: jwksUrl
                    }
                }
            }
        }
    ]
}

service / on new http:Listener(port) {

    @http:ResourceConfig {
        auth: {
            scopes: "issue-api:view-issues"
        }
    }
    resource function get issues() returns Issue[]|error {

        Issue[] response = [];
        foreach var issue in issuesTable {
            response.push(issue);
        }
        return response;
    }

    @http:ResourceConfig {
        auth: {
            scopes: "issue-api:create-issues1"
        }
    }
    resource function post issues(@http:Payload Name payload) returns Issue|error {
        
        string uuid = uuid:createType4AsString();
        Issue issue= {
            id: uuid,
            name: payload.name,
            status: OPEN
        };
        issuesTable.add(issue);
        return issue;
    }

    @http:ResourceConfig {
        auth: {
            scopes: "issue-api:close-issues"
        }
    }
    resource function patch issues/[string issueId](@http:Payload Status payload) returns Issue|http:NotFound|error {
        
        if !issuesTable.hasKey(issueId) {
            return http:NOT_FOUND;
        }
        
        Issue issue = issuesTable.get(issueId);
        issue.status = payload.status;
        issuesTable.put(issue);
        return issue;
    }
}
