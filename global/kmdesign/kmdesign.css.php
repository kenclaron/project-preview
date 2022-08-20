<style>
html, body {
  margin: 0 auto;
  background-color: #333;
  scroll-behavior: smooth;
}

ul {
  list-style-type: square;
}

a.link {
  color: white;
}

a.link:hover { 
  color: #dc3232;
}

a.kclbutton {
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 24px;
  display: block;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 4px;
  min-height: 28px;
  color: #dcdce7;
  font-family: monofonto;
  background-color: #dc3232;
  transition: 0.15s ease;
}

a.kclbutton:active {
  margin-left: 0px;
  margin-right: 0px;
}

a.kclbutton:hover {
  margin-left: 0px;
  margin-right: 0px;
}

a.kmbutton {
  width: 64px;
  height: 64px;
  box-shadow: 0px 0px 5px 2px #14141b;;
  background-color: #dc3232;
  z-index: 100000;
  transition: ease 0.5s;
}

a.kmbutton:hover {
  cursor: pointer;
}

a.kmbutton.back-to-top {
  background-image: url(/global/kmdesign/icons/arrow-up.png?301); 
  background-size: 100%;
  opacity: 0;
  pointer-events: none;
}

a.kmbutton.open-menu {
  background-image: url(/global/kmdesign/icons/menu.png?301); 
  background-size: 100%;
}

.kmside-top {
  position: fixed!important;
  top: 16px;
} 

.kmside-bottom {
  position: fixed!important;
  bottom: 16px;
} 

.kmside-left {
  position: fixed!important;
  left: 16px;
} 

.kmside-right {
  position: fixed!important;
  right: 16px;
} 

a[onclick]:hover {
  cursor: pointer;
}

.hover-effect {
  transition-duration: 0.25s;
}

.hover-effect:hover {
  box-shadow: 0 2px 6px 2px #14141b80, 0 4px 16px 8px #14141b70;
  cursor: pointer;
}

iframe#kimg {
  opacity: 0;
  pointer-events: none;
  display: none;
  width: 0px;
  height: 0px;
  position: fixed;
}

@media (max-device-width: 512px) {
  a.kmbutton {
    width: 128px;
    height: 128px;
  }
  .card h1 {
    font-size: 42px;
  }
  .card span, .card p {
    font-size: 32px;
  }
  .card .preview .footer p {
    font-size: 32px;
  }
  #news-content h1 {
    font-size: 34px;
  }
  #news-content h2 {
    font-size: 30px;
  }
  #news-content h3 {
    font-size: 26px;
  }
  #news-content p, #news-content span, #news-content ul, #news-content li  {
    font-size: 24px;
  }
  #news-content pre, #news-content code, #news-content table, #news-content td, #news-content tr,
  #news-content table tbody tr td ul li  {
    font-size: 24px;
  }
  #news-content small {
    font-size: 16px;
  }
}
</style>