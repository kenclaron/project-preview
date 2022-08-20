<style>
#bar-header {
    height: 64px;
    width: 100%;
    background-color: #111;
    color: #fff;
    position: fixed;
    z-index: 10;
}

#bar-header-links-left, #bar-header-links-right {
    height: 64px;
    display: block;
    position: absolute;
    z-index: 12;
}

#bar-header-links-left {
    left: 0;
}

#bar-header-links-right {
    right: 0;
}

#bar-header-links-left a, #bar-header-links-right a,
#bar-header-links-left img, #bar-header-links-right img  {
    height: 64px;
    width: 64px;
    float: left;
}

#bar-header-title {
    height: 64px;
    width: calc(100% - 160px);
    position: absolute;
    padding-left: 64px;
    padding-right: 128px;
    z-index: 11;
    float: left;
}

#bar-header-title h1 {
    margin: 0 auto;
    font-family: monospace;
    font-size: 24px;
    text-align: left;
    line-height: 64px;
    word-break: break-all;
}

@media (max-device-width: 512px) {
    #bar-header {
        height: 128px;
    }
    #bar-header-links-left, #bar-header-links-right {
        height: 128px;
    }
    #bar-header-links-left a, #bar-header-links-right a,
    #bar-header-links-left img, #bar-header-links-right img  {
        height: 128px;
        width: 128px;
    }
    #bar-header-title {
        height: 128px;
        width: calc(100% - 210px);
        padding-left: 114px;
        padding-right: 1128px;
    }
    #bar-header-title h1 {
        white-space: nowrap;
        overflow-x: auto;
        line-height: 128px;
        font-size: 64px!important;
    }
}
</style>