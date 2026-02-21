const mainSearch = document.getElementById('search');
const wikiSearch = document.getElementById('wikiSearch');
const ytSearch = document.getElementById('ytSearch');
const itSearch = document.getElementById('itSearch');
 
mainSearch.addEventListener('submit', function (event) {
    handleMainSearch(event);
});
wikiSearch.addEventListener('submit', function (event) {
    handleWikiSearch(event);
});
ytSearch.addEventListener('submit', function (event) {
    handleYoutubeSearch(event);
});
itSearch.addEventListener('submit', function (event) {
    handleItchSearch(event);
});
 
function handleMainSearch(event){
    event.preventDefault();
    const query = document.getElementById('sc').value.trim();
    // Source - https://stackoverflow.com/a/6927878
    // Posted by Flambino, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-02-21, License - CC BY-SA 3.0
    const regexp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

    if(regexp.test(query)){
        let url = query;
        if (!/^https?:\/\//i.test(url)) {
            url = "https://" + url;   
        }
        window.location.href = url
    }
    else{
        window.location.href = `https://duckduckgo.com/?q=`+encodeURIComponent(query);
    }
}
 
function handleYoutubeSearch(event){
    event.preventDefault();
    const query = document.getElementById('ysc').value.trim();
    window.location.href = `https://www.youtube.com/results?search_query=`+encodeURIComponent(query);
}

function handleWikiSearch(event){
    event.preventDefault();
    const query = document.getElementById('wsc').value.trim();
    window.location.href = `https://en.wikipedia.org/w/index.php?search=`+encodeURIComponent(query);
}

function handleItchSearch(event){
    event.preventDefault();
    const query = document.getElementById('isc').value.trim();
    window.location.href = `https://itch.io/search?q=`+encodeURIComponent(query);
}