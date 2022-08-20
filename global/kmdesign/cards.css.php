<style>
.card-content {
  display: inline-table;
  width: 100%;
  max-width: 1000px;
  min-width: 500px;
  padding-top: 8px;
  padding-bottom: 8px;
}

.card-content a {
  text-decoration: none;
}

.card-shadow {
  box-shadow: 0 1px 2px 1px #14141b25, 0 2px 4px 2px #14141b25;
  min-block-size: 100%;
}

.card {
  width: 480px;
  min-height: 394px;
  display: inline-block;
  margin: 10px;
  transition-duration: 0.25s;
  font-family: monospace;
  box-shadow: 0 1px 2px 1px #14141b25, 0 2px 4px 2px #14141b25;
  color: #dcdce7;
  vertical-align: top;
  min-block-size: 100%;
}

.card:hover {
  box-shadow: 0 2px 6px 2px #14141b80, 0 4px 16px 8px #14141b70;
  cursor: pointer;
}

.card hr {
  background-color: #dc3232;
  height: 4px;
  border: 0;
  margin-left: 24px;
  margin-right: 24px;
}

.card div.preview {
  width: 100%;
  min-width: 100%;
  height: 320px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card div.preview-image {
  width: 100%;
  min-width: 100%;
  max-height: 320px;
  padding-top: 66.6%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card h1, .card p {
  margin: 0 auto;
}

.card h1.title, .card p.description {
  padding-left: 16px;
  padding-right: 16px;
  text-align: left;
  word-break: break-word;
}

.card h1.title {
  text-transform: uppercase;
}

.card span.footer {
  height: 15px;
  display: block;
  padding: 16px;
}

.card span.footer p.author {
  float: left;
}

.card span.footer p.date {
  float: right;
}

.card div.card-header {
  width: 100%;
  height: 24px;
  background-color: transparent;
  color: rgb(220, 220, 220);
  font-size: 24px;
  text-align: center;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}

.card div.card-content {
  width: 100%;
  height: calc(100% - 24px);
  background-color: transparent;
  overflow-x: auto;
  overflow-y: hidden;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
}

.card.small {
  width: calc(33% - 18px);
}

.card.small p.description {
  min-height: 108px;
}

.card.medium {
  width: calc(50% - 20px);
}

.card.medium p.description {
  min-height: 16px;
}

.card.big {
  width: calc(100% - 20px);
  min-width: 492px;
}

.card.big p.description {
  min-height: 16px;
}

.card.big div.preview {
  height: 320px!important;
  padding-top: 0!important;
}

.card.small div.preview-image {
  height: 200px;
  padding-top: 0%!important;
}

.card.medium div.preview-image,
.card.big div.preview-image {
  height: 320px;
  padding-top: 0%!important;
}

.card.square {
  width: 128px;
  height: 128px;
  position: relative;
} 

.card.square h1 {
  text-transform: uppercase;
  padding: 16px;
  font-size: 24px;
} 

.card.square span.footer {
  height: auto;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  padding-left: 16px;
  padding-right: 0px;
  width: calc(100% - 16px);
}

@media (min-width: 769px) and (max-width: 912px) {
  .card.small {
    width: calc(33% - 18px);
  }
  .card.small p.description {
    min-height: 16px;
  }
  .card.medium div.preview-image {
    height: 240px;
    padding-top: 0%!important;
  }
}
@media (max-width: 768px), (max-device-width: 512px) {
  .card.small {
    width: calc(100% - 20px);
    min-width: 492px;
  }
  .card.small p.description {
    min-height: 16px;
  }
  .card.medium {
    width: calc(100% - 20px);
    min-width: 492px;
  }
  .card div.preview,
  .card.small div.preview,
  .card.medium div.preview,
  .card.big div.preview {
    background-size: 20%!important;
  }
  .card div.preview-image,
  .card.small div.preview-image,
  .card.medium div.preview-image,
  .card.big div.preview-image {
    height: 387px;
  }
  .card.big span.footer {
    bottom: 0!important;
  }
  .card.square .footer p {
    font-size: 20px;
  }
}
@media (max-device-width: 512px) {
  .card-content {
    width: 100%;
  }
  .card h1.title {
    padding-top: 8px;
  }
  .card span.footer {
    min-height: 32px!important;
    display: inline-block!important;
    width: calc(100% - 48px)!important;
  }
  .card-shadow {
  box-shadow: 0 1px 2px 1px #14141b75, 0 2px 4px 2px #14141b75;
  }
  .card {
    box-shadow: 0 1px 2px 1px #14141b75, 0 2px 4px 2px #14141b75;
  }
  .card:hover {
    box-shadow: 0 2px 6px 2px #14141bcc, 0 4px 16px 8px #14141bbb;
  }
  .card div.preview-image,
  .card.small div.preview-image,
  .card.medium div.preview-image,
  .card.big div.preview-image {
    height: 387px;
  }
}
</style>