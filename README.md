# majormud-captures
Tool for recording and viewing MajorMUD captures.

# Notes

**GET https://captures.majormud.io**  
200: single page app for uploading captures  
500: server error

**POST https://captures.majormud.io**  
200: parses the payload and returns a permalink to the result  
400: unable to parse the input  
500: server error  

**GET https://captures.majormud.io/{id}**  
200: renders the capture by id
400: missing/invalid id    
404: unknown id  
500: server error

**DELETE https://captures.majormud.io/{id}**  
204: deletes the capture by id
400: missing/invalid id    
404: unknown id  
500: server error
