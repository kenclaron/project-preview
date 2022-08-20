<style>
  #kmcontaineralert {
    position: fixed;
    z-index: 10000000;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
    height: 100vh;
    /* backdrop-filter: blur(100px); */
    background-color: #000d;
    margin: 0;
  }
  #kmmainalert {
    position: fixed;
    z-index: 10000010;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 25vw;
    min-width: 384px;
    height: 60vh;
    min-height: 384px;
    max-height: calc(80vh);
    background-color: #121212;
  }
  #kmalertheader {
    height: 30px;
    background-color: #0e0e0e;
  }
  #kmalertheader a {
    display: block;
    height: 100%;
    width: 45px;
    color: white;
    line-height: 32px;
    text-align: center;
    user-select: none;
    float: right;
    transition: 0.1s ease-in-out;
  }
  #kmalertheader a:hover {
    background-color: #f23232;
  }
  #kmalertheader a:focus, #kmalertheader a:active {
    background-color: #c20202;
  }
  #kmalertfooter {
    display: inline-block;
    padding-bottom: 16px;
    padding-top: 8px;
    width: 100%;
  }
  #kmalertcontent {
    flex: 1;
    height: calc(100% - 30px - 68px);
    overflow: auto;
  }
  #kmalerttext {
    text-align: justify; 
    padding: 16px;
    padding-top: 0px;
    padding-bottom: 0px;
    display: inline-block;
    color: #f2f2f2;
    display: block;
    font-size: 16px;
    font-family: monospace;
    max-height: 360px;
  }
  #kmalerttext .kmalertimage {
    width: calc(100% + 32px);
    min-width: 100%;
    height: 100vh;
    max-height: 196px;
    margin-left: -16px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  #kmalerttext a {
    color: #f2f2f2;
  }
  #kmalerttext a:hover {
    background-color: #f23232;
  }
  .kmalertlinks {
    display: block;
    width: calc(100% - 32px);
    margin-left: 16px;
    margin-top: 8px;
    height: 36px;
    text-align: center;
    background-color: #f2f2f2;
    font-size: 24px;
    line-height: 36px;
    transition: 0.1s ease-in-out;
    user-select: none;
  }
  .kmalertlinks:hover {
    width: 100%;
    margin-left: 0px;
  }
  #kmalerttitle {
    line-height: 30px;
    margin-left: 50%;
    transform: translateX(-50%);
    font-family: monospace;
    float: left;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: bold;
    color: #444!important;
  }

  @media (max-device-width: 512px) {
    #kmmainalert {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90vw;
      min-width: 384px;
      height: 90vh;
      min-height: 384px;
      max-height: 90vh;
      background-color: #121212;
    }
    #kmalertheader {
      height: 96px;
      background-color: #0e0e0e;
    }
    #kmalertheader a {
      width: 144px;
      line-height: 100px;
      font-size: 42px;
    }
    #kmalertcontent {
      height: calc(100% - 96px - 128px);
    }
    #kmalerttext {
      padding: 32px;
      font-size: 42px;
    }
    #kmalerttext .kmalertimage {
      margin-left: -32px;
      width: calc(100% + 64px);
      max-height: 384px;
    }
    .kmalertlinks {
      height: 96px;
      font-size: 64px;
      line-height: 96px;
    }
    #kmalerttitle {
      font-size: 48px;
      line-height: 96px;
    }
  }
  
</style>