set targetUrl to "http://127.0.0.1:8081/index.html?dev=1&ts=20260322e"
set jsPath to "/Users/jaimenunez/Desktop/Nawat_Conjugator/.tmp_safari_8081_live_probe.js"
set jsReadPath to "/Users/jaimenunez/Desktop/Nawat_Conjugator/.tmp_safari_8081_live_probe_read.js"
set jsPayload to read (POSIX file jsPath)
set jsReadPayload to read (POSIX file jsReadPath)
tell application "Safari"
    activate
    open location targetUrl
    delay 3
    tell front document
        set immediateJson to do JavaScript jsPayload
        delay 1
        set delayedJson to do JavaScript jsReadPayload
    end tell
end tell
set combinedJson to "{\"immediate\":" & immediateJson & ",\"delayed\":" & delayedJson & "}"
do shell script "printf %s " & quoted form of combinedJson
