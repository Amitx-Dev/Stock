@echo off
echo ===================================================
echo   Compiling TradeNest Java Backend Classes...
echo ===================================================
if not exist "backend\bin" mkdir "backend\bin"

javac -cp "backend\lib\mysql-connector-j-8.3.0.jar" -d "backend\bin" backend\src\main\java\com\tradenest\config\*.java backend\src\main\java\com\tradenest\exceptions\*.java backend\src\main\java\com\tradenest\interfaces\*.java backend\src\main\java\com\tradenest\models\*.java backend\src\main\java\com\tradenest\dao\*.java backend\src\main\java\com\tradenest\service\*.java backend\src\main\java\com\tradenest\server\*.java backend\src\main\java\com\tradenest\gui\*.java

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java compilation failed!
    pause
    exit /b %ERRORLEVEL%
)

echo ===================================================
echo   Starting TradeNest Java Web & Servlets Server...
echo   Port: 8080 (REST API for React UI)
echo ===================================================
java -cp "backend\bin;backend\lib\mysql-connector-j-8.3.0.jar" com.tradenest.server.TradeNestServer 8080
pause
