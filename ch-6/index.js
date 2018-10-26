import $ from 'jquery';
import { compose, curry, map, prop } from 'ramda';

const Impure = {
    getJSON: curry((callback, url) => $.getJSON(url, callback)),
    setHtml: curry((sel, html) => $(sel).html(html)),
    trace: curry((tag, x) => { console.log(tag, x); return x; }),
};

const host = 'api.flickr.com';
const path = '/services/feeds/photos_public.gne';
const query = t => `?tags=${t}&format=json&jsoncallback=?`;
const url = t => `https://${host}${path}${query(t)}`;

const mediaUrl = compose(prop('m'), prop('media'));
const img = src => $('<img />', { src });
const mediaToImg = compose(img, mediaUrl)
const images = compose(map(mediaToImg), prop('items'));

const render = compose(Impure.setHtml('#js-main'), images);

const app = compose(Impure.getJSON(render), url);

app('cats');