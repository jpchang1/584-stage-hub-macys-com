import Utils from "../utils/common.js";
const getElement = sel => {
  if (sel)
    return 'string' === typeof sel ? Utils.getById(sel) : sel;
  else
    throw new Error('need a selector or element');
};

class Player{
  constructor(sel, options, globalConfig){
    this.options = options || {};
    this.config = globalConfig || {};
    this.el = getElement(sel);
    this.assets = [];
    this.instance = null;
    this.initialResize = true;
    this.startWith = this.options.startWith || null;
    this.currentIndex = null;
    this.onReadyCalled = false;
    this.hasPlayed = false;
    this.isFullScreen = false;
    this.initialize();
    this.loadSelected = this.loadSelected.bind(this);
  }
  getOption(s){
    return Utils.isUndefined(this.options[s]) ? null : this.options[s];
  }
  getCallableOption(s){
    return Utils.isFunction(this.config[s]) ? this.config[s] : null;
  }
  loadSelected(video){
    if(video){
      var next = this.buildAsset(video);
      this.play(next, true);
    }
  }
  getPlayButtonOptions(){
    return Utils.compact({
      height: this.getOption('play_button_height'),
      width: this.getOption('play_button_width'),
      backgroundColor: this.getOption('play_button_background_color'),
      borderRadius: this.getOption('play_button_border_radius'),
      borderWidth: this.getOption('play_button_border_width'),
      borderColor: this.getOption('play_button_border_color'),
      borderStyle: this.getOption('play_button_border_style'),
      iconColor: this.getOption('play_button_icon_color')
    });
  }
  setControlsOptions(){
    this.controls = Utils.compact({
      active: true,
      seekBar: Utils.compact({
        progressColor: this.getOption('progress_color')
      }),
      floater: Utils.compact({
        controlbarColor: this.getOption('control_bar_color'),
        iconColor: this.getOption('icon_color'),
        removeControls: this.getOption('remove_controls')
      }),
      playbutton: this.getPlayButtonOptions(),
      overlayColor: this.getOption('overlay_color'),
      overlayOpacity: this.getOption('overlay_opacity')
    });
  }
  setAdversitingOptions(){
    if (!this.options.advertising || Utils.isEmpty(this.options.advertising))
      return;

    const options = this.options.advertising;

    this.advertising = Utils.compact({
      enabled: !!options.enabled,
      adServerUrl: options.adserverurl || null,
      adTimeout: options.adtimeout || "2000",
      maxAds: options.maxads || "100",
      adInterval: !Utils.isUndefined(options.adinterval) ? String(options.adinterval) : "0"
    });
  }
  shallCue(auto){
    return Utils.isMobile || (auto && !this.autonext) || !this.autoplay;
  }
  play(asset, ongoing){
    if ('string' === typeof asset) {
      const targetAsset = this.getAssetById(asset);
      asset = targetAsset.asset;
      this.currentIndex = targetAsset.index;
    } else {
      this.currentIndex = this.assets.indexOf(asset);
    }

    if(!this.instance)
      return;
    if (this.shallCue(ongoing) && !this.hasPlayed) {
      this.instance.cueVideo(asset);
    } else {
      this.instance.loadVideo(asset);
    }

    this.hasPlayed = true;
  }
  controlBarZindex(){
    const controlBar = this.el.querySelector("#ControlBarFloater");
    if (controlBar && controlBar.parentNode) {
      controlBar.parentNode.style.zIndex = "9999";
    }
  }
  getParentSize(param){
    const el = this.el.parentNode;
    let size = null;

    if ('width' === param) {
      size = el.offsetWidth;
    } else if ('height' === param) {
      size = el.offsetHeight;
    }
    return size;
  }
  handleFullScreen(){
    if(!Utils.isUndefined(window.BigScreen)){
      var that = this;
      BigScreen.onchange = function(){
        that.isFullScreen = !that.isFullScreen;
      };
    }
  }
  resize(){
    if (!this.getParentSize)
      return;

    const width = arguments[0] || this.getParentSize('width');
    const height = arguments[1] || this.getParentSize('height');

    const isFullScreen = this.isFullScreen
    if (this.instance && !isFullScreen) {
      this.instance.resize(width, height);
    }

    this.initialResize = false;

    if (this.onResize)
      this.onResize(this.initialResize, [width, height]);
  }
  handleWindowResize(){
    const that = this,
      onResize = function () {
        setTimeout(function () {
          that.resize.call(that);
        }, 0);
      };

    window.removeEventListener('resize', onResize, false);
    window.addEventListener('resize', onResize, false);
  }
  handleClick(){
    const that = this;
    const defaultStop = this.options.clickDefaultStop;
    const optOnClick = this.options.onClick;
    const onClick = Utils.isFunction(optOnClick) ? optOnClick : function (e) {
      that.instance.removeOverlay();
      that.resize();
      if (defaultStop) {
        Utils.stopEvent(e);
      }
    };

    this.el.removeEventListener('click', onClick, false);
    this.el.addEventListener('click', onClick, false);
  }
  getCurrentAsset(){
    return this.assets[this.currentIndex];
  }
  getAssetById(id){
    const assets = this.assets;
    const assetsLength = assets.length;
    let res = null;

    for (var i = 0; i < assetsLength; i++) {
      var asset = assets[i];

      if (asset.assetId == id) {
        res = {
          index: i,
          asset: asset
        };
      }
    }

    return res;
  }
  onReady(){
    if (this.onReadyCalled) {
      this.resize.call(this);
    } else {
      this.resize.call(this);

      this.controlBarZindex();
      this.handleFullScreen();
      this.handleWindowResize();
      this.handleClick();

      if (this.onPlayerReady) {
        this.onPlayerReady(this);
      }
    }
  }
  handleVideoEnded(){
    this.currentIndex++;

    if (!this.assets[this.currentIndex]) {
      this.currentIndex = 0;
    }

    var next = this.assets[this.currentIndex];

    this.play(next, true);

    if (this.onNext) {
      this.onNext(next);
    }
  }
  onStateChange(e){
    if (this.onChange) {
      this.onChange(e);
    }
  }
  addExtraConfig(config){
    config = config || {};
    var extras = ["preload", "poster", "overlay"];
    for (var i = 0; i < extras.length; i++) {
      var option = extras[i];
      if (!Utils.isUndefined(this[option]) && this[option] !== null) {
        config[option] = this[option];
      }
    }
    return config;
  }
  getConfig(){
    return Utils.compact({
			sharing: TVSite.hub.sharing,
      techOrder: this.getOption('tech_order'),
      mediaProviders: this.getOption('media_providers'),
      analytics: {
        tvpa: this.getOption('analytics')
      },
      apiBaseUrl: this.getOption('api_base_url'),
      swf: this.flashUrl,
      divId: this.el.id,
      controls: this.controls,
      version: this.version,
      advertising: this.advertising,
      preload: this.getOption('preload'),
      poster: this.getOption('poster'),
      overlay: this.getOption('overlay')
    });
  }
  startPlayer(){
    var config = this.getConfig();
    var that = this;

    Utils.globalPoll(['TVPage'], function () {
      config.onReady = function (e, pl) {
        that.onReady(e, pl);
        that.onReadyCalled = true;
        that.config.player = that.player;
      };

      config.onStateChange = function (e) {
        that.onStateChange(e);
      };
      that.player = new TVPage.player(config);

      const globalRunId = that.player.options.globalRunId;

      that.instance = TVPage.instances[globalRunId];
      let index = 0;
      let asset = that.assets[index];

      if (that.startWith) {
        var assetResp = that.getAssetById(that.startWith);

        index = assetResp.index;
        asset = assetResp.asset;
      }

      that.currentIndex = index;

      that.play(asset);
    });
  }
  buildAsset(obj){
      if (Utils.isEmpty(obj))
          return {};

      var asset = {};

      if(obj.asset){
          asset = obj.asset || {};
          asset.assetId = obj.id;
          asset.assetTitle = obj.title;
          asset.loginId = obj.loginId;
          asset.id = obj.id;
          asset.titleTextEncoded = obj.titleTextEncoded;
          asset.type = asset.type || 'youtube';
          asset.analyticsObj = {
              pg: obj.parentId,
              vd: asset.assetId,
              li: asset.loginId
          };

          asset.sources = asset.sources || [{
              file: asset.videoId
          }];
      }
      else if(obj.assets){
          asset = obj;
          asset.type = 'photo';
          asset.analyticsObj = {
              pg: obj.parentId,
              vd: asset.assetId,
              li: asset.loginId
          };
      }

      return asset;
  }
  addAssets(objs){
    objs = objs || [];

    var objsLength = objs.length;
    let i = 0;
    let obj = null;

    for (i = 0; i < objsLength; i++) {
      obj = objs[i];

      if (!this.getAssetById(obj.id)) {
        this.assets.push(this.buildAsset(obj));
      }
    }
  }
  setAdvertisingOptions(){
    if (!this.options.advertising || Utils.isEmpty(this.options.advertising))
      return;

    var options = this.options.advertising;

    this.advertising = Utils.compact({
      enabled: !!options.enabled,
      adServerUrl: options.adserverurl || null,
      adTimeout: options.adtimeout || "2000",
      maxAds: options.maxads || "100",
      adInterval: !Utils.isUndefined(options.adinterval) ? String(options.adinterval) : "0"
    });
  }
  setConfig(){
    this.version = this.getOption('player_version');
    this.flashUrl = '//cdnjs.tvpage.com/tvplayer/tvp-' + this.version + '.swf';
    this.autoplay = this.getOption('autoplay');
    this.autonext = this.getOption('autonext');
    this.onChange = this.getCallableOption('onChange');
    this.onResize = this.getCallableOption('onResize');
    this.onNext = this.getCallableOption('onNext');
    this.onPlayerReady = this.getCallableOption('onPlayerReady');
    this.onClick = this.getCallableOption('onClick');
  }
  initialize(){
    this.setControlsOptions();
    this.setAdvertisingOptions();
    this.setConfig();
    this.addAssets(this.options.data);
    this.startPlayer();
  }
}

export default Player;