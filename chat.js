(function(){
    var e = document.createElement("script");
    e.setAttribute("src","https://code.jquery.com/jquery-1.9.1.js");
    document.body.append(e);
})();
jQuery.noConflict();
(function($) {
    $(document).on('ready', function() {
        $(".listWithImage,.article-footer,.article-sub-category").remove();
    });
    var h = $("<div>").appendTo("#chat");
    function add(tag, ttl, str, def){
        return $("<" + tag + ">").appendTo(
            $("<div>").appendTo(h).text(ttl + " : ")
        ).attr({
            placeholder: str
        }).val(def);
    }
    var inputName = add("input", "名前", "きょーた", $("#comment-form-author").val() || $("#author").val());
    var inputText = add("textarea", "本文", "Shift+Enterで投稿");
    $("<button>").appendTo(h).text("送信").on("click", function(e){
        $(e).add(inputName).add(inputText).attr("disabled", true);
        $.post("https://comment.blogcms.jp/livedoor/furage/8461595/post",{
            author: inputName.val(),
            body: inputText.val(),
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
    });
    h.each((i,e)=>$(e).append("<br>"));
})(jQuery);
