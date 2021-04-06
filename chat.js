(function(){
    (function(){
        var e = document.createElement("script");
        e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
        document.body.append(e);
    })();
    jQuery.noConflict();
    (function($) {
        $.getScript("https://furage.github.io/autoMatome/mylib/adblock.js");
        $.getScript("https://yaju1919.github.io/lib/lib/yaju1919.js", function(){
            $(document).on('ready', function(){ main($) });
        });
    })(jQuery);
    function main($){
        $(".listWithImage,.article-footer,.article-sub-category").remove();
        $("#article-contents").parent().children().each(function(i,e){
            if(i) $(e).remove();
        });
        var h = $("<div>").appendTo("#chat");
        var inputName = yaju1919.addInputText(h,{
            id: "inputName",
            title: "名前",
            placeholder: "きょーた",
            value: $("#comment-form-author").val() || $("#author").val(),
        });
        var inputText = yaju1919.addInputText(h,{
            textarea: true,
            id: "inputText",
            title: "本文",
            placeholder: "Shift+Enterで投稿",
            width: "80%",
        });
        $("#inputText").on("keypress", function(e){
            if(e.key === "Enter" && e.shiftKey) send();
        });
        h.append("<br>");
        var btn = $("<button>").appendTo(
            $("<div>").appendTo(h).css({textAlign:"center"})
        ).text("投稿").on("click", send).css({
            width: "40%",
            height: 50
        });
        function send(){
            btn.add("#inputName,#inputText").attr("disabled", true);
            $.post("https://comment.blogcms.jp/livedoor/furage/8461595/post",{
                author: inputName(),
                body: inputText(),
                rating: "",
                rating_icon: "star",
                cookie: "on"
            }).done(function(r){
                console.log(r);
            }).fail(function(r){
                console.error(r);
            }).always(function(){
                location.reload();
            });
        }
    }
})();
