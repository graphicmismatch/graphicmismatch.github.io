document.addEventListener("DOMContentLoaded",populateNavigation)

function populateNavigation(){
    const sidebar =document.querySelector(".sidebar")
    const navbar =document.querySelector(".navbar")
    navbar.innerHTML = `
         <ul>
      <li class="navlogo">
        <a href="index.html">&gt; GraphicMismatch</a>
      </li>
      <li class="navcontent hideonmobile">
        <a href="index.html">Home</a>
      </li>
      <li class="navcontent hideonmobile">
        <a href="directory.html">Directory</a>
      </li>
      <li class="navcontent hideonmobile">
        <a href="privacy.html">Privacy Policies</a>
      </li>
      <li class="navcontent hideonmobile">
        <a href="links.html">Links</a>
      </li>
      <li
        class="navcontent navmenubutton"
        onclick="showSidebar()"
        value="run external javascript"
      >
        <a href="#"> ▼ </a>
      </li>
    </ul>`

    sidebar.innerHTML=`
    <ul>
      <li
        class="sbcontent"
        onclick="hideSidebar()"
        value="run external javascript"
      >
        <a href="#">◀</a>
      </li>
      <li class="sbcontent">
        <a href="index.html">Home</a>
      </li>
      <li class="sbcontent">
        <a href="links.html">Links</a>
      </li>
      <li class="sbcontent">
        <a href="directory.html">Directory</a>
      </li>
      <li class="sbcontent">
        <a href="privacy.html">Privacy Policies</a>
      </li>
    </ul>
    `
}