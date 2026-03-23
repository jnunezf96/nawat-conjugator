set targetUrl to "http://127.0.0.1:8081/"
set jsPayload to "JSON.stringify((function(){return {href:String(window.location.href||''),title:String(document.title||''),bodyTextStart:String(document.body?document.body.innerText.slice(0,400):''),hasVerbInput:Boolean(document.getElementById('verb')),h1s:Array.from(document.querySelectorAll('h1')).map(function(el){return el.innerText.trim();}).slice(0,5),firstButtons:Array.from(document.querySelectorAll('button')).map(function(el){return el.innerText.trim();}).filter(Boolean).slice(0,10)};})());"
tell application "Safari"
    activate
    open location targetUrl
    delay 2
    tell front document
        set resultJson to do JavaScript jsPayload
    end tell
end tell
do shell script "printf %s " & quoted form of resultJson
