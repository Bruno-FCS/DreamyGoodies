# Backend

## Setup

Copy the `pem` files to the following resources folder:
- src/main/resources/public.pem
- src/main/resources/private.pem

## Login

For testing, copy the curl code below and paste in Postman URL request or use in Terminal Bash:

```
curl --location 'http://localhost:8080/auth/login' \
--header 'Content-Type: application/json' \
--header 'Cookie: JSESSIONID=DBCDB96F565C431F7871C5D98ACAF042' \
--data-raw '{
"email": "admin@admin.com",
"password": "1234"
}'
```