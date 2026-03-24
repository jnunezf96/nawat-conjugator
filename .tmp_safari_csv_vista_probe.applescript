set targetUrl to "http://127.0.0.1:8081/index.html?dev=1&ts=20260324csv"
set jsPath to "/Users/jaimenunez/Desktop/Nawat_Conjugator/.tmp_safari_csv_vista_probe.js"
set jsPayload to read (POSIX file jsPath)
tell application "Safari"
    activate
    open location targetUrl
    tell front document
        delay 2
        set probeJson to do JavaScript jsPayload
    end tell
end tell
do shell script "printf %s " & quoted form of probeJson
