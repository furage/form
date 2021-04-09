(function(){
    (function(){
        var e = document.createElement("script");
        e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
        document.body.append(e);
    })();
    jQuery.noConflict();
    (function($) {
        var cnt = 0;
        function f(){
            if(cnt++ === 1) main($);
        }
        $.getScript("https://furage.github.io/autoMatome/mylib/adblock.js");
        $.getScript("https://yaju1919.github.io/lib/lib/yaju1919.js", f);
        $(document).on('ready', f);
    })(jQuery);
    function main($){
        var startFlag = false;
        var h = $("#form");
        var inputUrl = yaju1919.addInputText(h,{
            id: "inputUrl",
            title: "スレッドURL",
            width: "70%",
            change: function(s){
                var m = s.match(/https?:\/\/[\w\/:%#\$&amp;\?\(\)~\.=\+\-]+/);
                if(startFlag) $("#inputUrl").css({backgroundColor:m?"white":"pink"});
                return m ? m[1] : '';
            },
        });
        h.append("<br>");
        $("<div>").appendTo(h).text("どんな感じにまとめてほしいのか");
        var inputText = yaju1919.addInputText(h,{
            title: "要望",
            textarea: true,
            width: "70%",
            height: "100",
        });
        h.append("<br>");
        var hBtn = $("<div>").appendTo(h).css({
            textAlign:"center"
        });
        $("<button>").appendTo(hBtn).text("送信").css({
            width: 100,
            height: 50
        }).on("click touchstart",function(){
            var url = inputUrl(),
                text = inputText();
            if(!url) return msg.text("※スレッドURLの入力は必須です。");
            send(["◆スレッドURL",url,"◆要望",text].map(function(v,i){
                return i % 2 ? "```" + v.replace(/`/g,'') + " ```" : v;
            }).join('\n'));
            $("<div>").appendTo($("#form").empty()).text("まとめ依頼を受け付けました。").css({color:"red"});
        });
        var msg = $("<div>").appendTo(h);
        function send(content){
            var data = {
                "username": '',
                "avatar_url": '',
                content: "<@&757839033748422668>\n" + content,
                tts: false
            };
            var xhr = new XMLHttpRequest();
            xhr.open( 'POST', "https://discord.com/api/webhooks/830135544121917510/hPN1p6zjc8YjQMXIYTXbA4o0dNC7r8ON3zHUiH3d7RHC0-iu4FA3wWmU6aPUCBzdtYIj" );
            xhr.setRequestHeader( "content-type", "application/json" );
            xhr.send(JSON.stringify(data));
        }
        startFlag = true;
    }
})();
