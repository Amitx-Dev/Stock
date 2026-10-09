@echo off
echo ===================================================
echo   Compiling TradeNest Java GUI Application...
echo ===================================================
if not exist "backend\bin" mkdir "backend\bin"

javac -cp "backend\lib\mysql-connector-j-8.3.0.jar" -d "backend\bin" backend\src\main\java\com\tradenest\config\*.java backend\src\main\java\com\tradenest\exceptions\*.java backend\src\main\java\com\tradenest\interfaces\*.java backend\src\main\java\com\tradenest\models\*.java backend\src\main\java\com\tradenest\dao\*.java backend\src\main\java\com\tradenest\service\*.java backend\src\main\java\com\tradenest\gui\*.java

if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Java compilation failed!
    pause
    exit /b %ERRORLEVEL%
)

echo ===================================================
echo   Launching TradeNest Pro Desktop GUI Terminal...
echo ===================================================
start javaw -cp "backend\bin;backend\lib\mysql-connector-j-8.3.0.jar" com.tradenest.gui.TradeNestGUI
echo TradeNest GUI launched!
