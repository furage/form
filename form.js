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
        yaju1919.addInputText("#rss",{
            title: "弊サイトのRSS",
            value: "https://kyota.blog.jp/index.rdf",
            readonly: true
        });
        var h = $("#form");
        var inputURL = yaju1919.addInputText(h,{
            id: "inputURL",
            title: "ブログURL",
            width: "70%",
            change: function(s){
                var m = s.match(/https?:\/\/[\w\/:%#\$&amp;\?\(\)~\.=\+\-]+/);
                if(startFlag) $("#inputUrl").css({backgroundColor:m?"white":"pink"});
                return m ? m[1] : '';
            },
        });
        var inputName = yaju1919.addInputText(h,{
            id: "inputName",
            title: "ブログ名",
        });
        var inputMail = yaju1919.addInputText(h,{
            id: "inputMail",
            title: "メールアドレス",
            change: function(s){
                var m = s.match(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/);
                if(startFlag) $("#inputUrl").css({backgroundColor:m?"white":"pink"});
                return m ? m[1] : '';
            },
        });
        var inputRSS = yaju1919.addInputText(h,{
            id: "inputRSS",
            title: "RSSリンク",
            width: "70%",
            change: function(s){
                var m = s.match(/https?:\/\/[\w\/:%#\$&amp;\?\(\)~\.=\+\-]+/);
                if(startFlag) $("#inputUrl").css({backgroundColor:m?"white":"pink"});
                return m ? m[1] : '';
            },
        });
        h.append("<br>");
        var inputText = yaju1919.addInputText(h,{
            title: "本文",
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
            var url = inputURL(),
                name = inputName(),
                mail = inputMail(),
                rss = inputRSS(),
                text = inputText();
            if(!(url && name && mail && rss && text)) return msg.text("※全ての項目を埋めてください");
            if(send([
                "★サイトURL", url,
                "◆サイト名", name,
                "◆メアド", mail,
                "◆RSS", rss,
                "◆本文", text,
            ].map(function(v,i){
                return i % 2 ? "```" + v.replace(/`/g,'') + " ```" : v;
            }).join('\n'))) return msg.text("※エラー　本文が長すぎばい！");
            $("<div>").appendTo($("#form").empty()).text("申請を受け付けました。").css({color:"red"});
        });
        var msg = $("<div>").appendTo(h);
        function send(content){
            if(content.length > 1900) return true;
            var data = {
                "username": '',
                "avatar_url": '',
                content: "@everyone\n" + content,
                tts: false
            };
            var xhr = new XMLHttpRequest();
            xhr.open( 'POST', "https://discord.com/api/webhooks/829338766938341387/354agumH-DkVGVlk3451CcGKLGVpeIz4b4eI04EgMh56TvFB1RGCi1WawTY6WAXqg-3z" );
            xhr.setRequestHeader( "content-type", "application/json" );
            xhr.send(JSON.stringify(data));
        }
        startFlag = true;
    }
})();
