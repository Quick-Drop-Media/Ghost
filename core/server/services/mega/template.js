/* eslint indent: warn, no-irregular-whitespace: warn */
const iff = (cond, yes, no) => (cond ? yes : no);
module.exports = ({post, site, templateSettings}) => {
    const date = new Date();
    return `<!doctype html>
<html>

<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>${post.title}</title>
<style>
/* -------------------------------------
    GLOBAL RESETS
------------------------------------- */

/*All the styling goes here*/

img {
    border: none;
    -ms-interpolation-mode: bicubic;
    max-width: 100%;
}

body {
    background-color: #fff;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    -webkit-font-smoothing: antialiased;
    font-size: 18px;
    line-height: 1.4;
    margin: 0;
    padding: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    color: #15212A;
}

table {
    border-collapse: separate;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    width: 100%;
}

table td {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 18px;
    vertical-align: top;
    color: #15212A;
}

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */
.body {
    background-color: #fff;
    width: 100%;
}

/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
.container {
    display: block;
    margin: 0 auto !important;
    /* makes it centered */
    max-width: 600px;
}

/* This should also be a block element, so that it will fill 100% of the .container */
.content {
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    max-width: 600px;
}

/* -------------------------------------
    POST CONTENT
------------------------------------- */
hr {
    position: relative;
    display: block;
    width: 100%;
    margin: 1em 0;
    padding: 0;
    height: 1px;
    border: 0;
    border-top: 1px solid #e5eff5;
}

p,
ul,
ol,
dl,
blockquote {
    margin: 0 0 1.5em 0;
    line-height: 1.6em;
}

ol,
ul {
    padding-left: 1.3em;
    padding-right: 1.5em;
}

ol ol,
ul ul,
ul ol,
ol ul {
    margin: 0.5em 0 1em;
}

ul {
    list-style: disc;
}

ol {
    list-style: decimal;
}

ul,
ol {
    max-width: 100%;
}

li {
    margin: 0.5em 0;
    padding-left: 0.3em;
    line-height: 1.6em;
}

dt {
    float: left;
    margin: 0 20px 0 0;
    width: 120px;
    color: #15212A;
    font-weight: 500;
    text-align: right;
}

dd {
    margin: 0 0 5px 0;
    text-align: left;
}

blockquote {
    margin: 2em 0;
    padding: 0 25px 0 25px;
    border-left: ${templateSettings.accentColor || '#15212A'} 2px solid;
    font-size: 17px;
    font-weight: 500;
    line-height: 1.6em;
    letter-spacing: -0.2px;
}

blockquote p {
    margin: 0.8em 0;
    font-size: 1em;
}

blockquote small {
    display: inline-block;
    margin: 0.8em 0 0.8em 1.5em;
    font-size: 0.9em;
    opacity: 0.8;
}

blockquote cite {
    font-weight: bold;
}
blockquote cite a {
    font-weight: normal;
}

a {
    color: #007c89;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    line-height: 1.15em;
    font-weight: 600;
    text-rendering: optimizeLegibility;
}

h1 {
    margin: 0.5em 0 0.5em 0;
    font-size: 42px;
    font-weight: 600;
}

h2 {
    margin: 0.5em 0 0.5em 0;
    font-size: 26px;
    line-height: 1.22em;
}

h3 {
    margin: 0.5em 0 0.5em 0;
    font-size: 22px;
    line-height: 1.25em;
    color: #007dde;
}

h4 {
    margin: 1.8em 0 0.5em 0;
    font-size: 21px;
    line-height: 1.3em;
}

h5 {
    margin: 2em 0 0.5em 0;
    font-size: 19px;
    line-height: 1.4em;
}

h6 {
    margin: 2em 0 0.5em 0;
    font-size: 19px;
    line-height: 1.4em;
    font-weight: 700;
}

strong {
    font-weight: 700;
}

figure {
    margin: 0 0 1.5em;
    padding: 0;
}

figcaption {
    text-align: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 14px;
    padding-top: 5px;
    line-height: 1.5em;
}

code {
    font-size: 0.9em;
}

pre {
    white-space: pre-wrap;
    background: #15212A;
    padding: 15px;
    border-radius: 3px;
    line-height: 1.2em;
    color: #ffffff;
}

p code {
    background: #F2F7FA;
    word-break: break-all;
    padding: 1px 7px;
    border-radius: 3px;
}

figure blockquote p {
    font-size: 1em;
}

.site-icon {
    padding-bottom: 10px;
    padding-top: 20px;
    text-align: center;
    border-radius: 3px;
}

.site-icon img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
}

.site-info {
    padding-top: 50px;
    border-bottom: 1px solid #e5eff5;
}

.site-url {
    color: #15212A;
    font-size: 16px;
    letter-spacing: -0.1px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 50px;
}

.post-title {
    padding-bottom: 10px;
    font-size: 42px;
    line-height: 1.1em;
    font-weight: 600;
    text-align: center;
}

.post-title-link {
    color: #15212A;
    display: block;
    text-align: center;
    margin-top: 50px;
}

.post-meta,
.view-online {
    padding-top: 20px;
    padding-bottom: 30px;
    white-space: nowrap;
    color: #738a94;
    font-size: 13px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    text-align: center;
}

.view-online {
    text-align: right;
}

.view-online-link {
    word-wrap: none;
    white-space: nowrap;
    color: #15212A;
}

.feature-image {
    padding-bottom: 30px;
    width: 100%;
}

.post-content {
    max-width: 600px !important;
    font-family: Georgia, serif;
    font-size: 18px;
    line-height: 1.5em;
    color: #23323D;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5eff5;
}

.post-content-sans-serif {
    max-width: 600px !important;
    font-size: 17px;
    line-height: 1.5em;
    color: #23323D;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5eff5;
}

.post-content a,
.post-content-sans-serif a {
    color: #007c89;
    text-decoration: underline;
}

.kg-bookmark-card {
    width: 100%;
    background: #ffffff;
}

.kg-bookmark-card a {
    text-decoration: none;
}

.kg-card + .kg-bookmark-card {
    margin-top: 0;
}

.kg-image-card img {
    display: block;
    margin: 0 auto;
    height: auto !important;
}

.kg-bookmark-container {
    display: flex;
    min-height: 148px;
    color: #15212A;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid #e5eff5;
}

.kg-bookmark-content {
    display: inline-block;
    width: 100%;
    padding: 20px;
}

.kg-bookmark-title {
    color: #15212A;
    font-size: 15px;
    line-height: 1.5em;
    font-weight: 600;
}

.kg-bookmark-description {
    display: -webkit-box;
    overflow-y: hidden;
    margin-top: 12px;
    max-height: 40px;
    color: #738a94;
    font-size: 13px;
    line-height: 1.5em;
    font-weight: 400;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.kg-bookmark-thumbnail {
    min-width: 140px;
    max-width: 180px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 0 2px 2px 0;
}

.kg-bookmark-thumbnail img {
    display: none;
}

.kg-bookmark-metadata {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 14px;
    color: #15212A;
    font-size: 13px;
    font-weight: 400;
}

.kg-bookmark-icon {
    margin-right: 8px;
    width: 22px;
    height: 22px;
}

.kg-bookmark-author {
    line-height: 1.5em;
}

.kg-bookmark-publisher {
    overflow: hidden;
    max-width: 240px;
    line-height: 1.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.kg-bookmark-publisher:before {
    content: "•";
    margin: 0 6px;
}

.kg-gallery-container {
    margin-top: -20px;
}

.kg-gallery-image img {
    width: 100% !important;
    height: auto !important;
    padding-top: 20px;
}

.kg-video-preview {
    background-color: #1d1f21;
    background-image: radial-gradient(circle at center, #5b5f66, #1d1f21);
    display: block;
    text-decoration: none !important;
}
.kg-video-preview table {
    background-size: cover;
    min-height: 200px; /* for when images aren't loaded */
}
.kg-video-play-button {
    height: 2em;
    width: 3em;
    margin: 0 auto;
    border-radius: 10px;
    padding: 1em 0.8em 0.6em 1em;
    font-size: 1em; /* change this to resize */
    background-color: rgba(0,0,0,0.85);
}
.kg-video-play-button div {
    display: block;
    width: 0;
    height: 0;
    margin: 0 auto;
    line-height: 0px; /* fix for Yahoo Mail */
    border-color: transparent transparent transparent white;
    border-style: solid;
    border-width: 0.8em 0 0.8em 1.5em;
}


/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
    background: #ffffff;
    border-radius: 3px;
    width: 100%;
}

.wrapper {
    box-sizing: border-box;
    padding: 0 20px;
}

.content-block {
    padding-bottom: 10px;
    padding-top: 10px;
}

.footer {
    color: #738a94;
    margin-top: 20px;
    text-align: center;
    font-size: 13px;
    padding-bottom: 10px;
    padding-top: 10px;
    padding-left: 30px;
    padding-right: 30px;
    line-height: 1.5em;
}

.footer a {
    color: #738a94;
    text-decoration: underline;
}

/* -------------------------------------
    BUTTONS
------------------------------------- */
.btn {
    box-sizing: border-box;
    width: 100%;
}

.btn>tbody>tr>td {
    padding-bottom: 15px;
}

.btn table {
    width: auto;
}

.btn table td {
    background-color: #ffffff;
    border-radius: 5px;
    text-align: center;
}

.btn a {
    background-color: #ffffff;
    border: solid 1px #3498db;
    border-radius: 5px;
    box-sizing: border-box;
    color: #3498db;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 12px 25px;
    text-decoration: none;
    text-transform: capitalize;
}

.btn-primary table td {
    background-color: #3498db;
}

.btn-primary a {
    background-color: #3498db;
    border-color: #3498db;
    color: #ffffff;
}

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
    margin-bottom: 0;
}

.first {
    margin-top: 0;
}

.align-center {
    text-align: center;
}

.align-right {
    text-align: right;
}

.align-left {
    text-align: left;
}

.clear {
    clear: both;
}

.mt0 {
    margin-top: 0;
}

.mb0 {
    margin-bottom: 0;
}

.preheader {
    color: transparent;
    display: none;
    height: 0;
    max-height: 0;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    mso-hide: all;
    visibility: hidden;
    width: 0;
}

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 620px) {

    table.body {
        width: 100%;
        min-width: 100%;
    }

    table.body p,
    table.body ul,
    table.body ol,
    table.body td,
    table.body span {
        font-size: 16px !important;
    }

    table.body pre {
        white-space: pre-wrap !important;
        word-break: break-word !important;
    }

    table.body .wrapper,
    table.body .article {
        padding: 0 10px !important;
    }

    table.body .content {
        padding: 0 !important;
    }

    table.body .container {
        padding: 0 !important;
        width: 100% !important;
    }

    table.body .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
    }

    table.body .btn table {
        width: 100% !important;
    }

    table.body .btn a {
        width: 100% !important;
    }

    table.body .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
    }

    table.body .site-icon img {
        width: 40px !important;
        height: 40px !important;
    }

    table.body .site-url a {
        font-size: 14px !important;
        padding-bottom: 15px !important;
    }

    table.body .post-meta {
        white-space: normal !important;
        font-size: 12px !important;
        line-height: 1.5em;
    }

    table.body .view-online-link,
    table.body .footer,
    table.body .footer a {
        font-size: 12px !important;
    }

    table.body .post-title a {
        font-size: 32px !important;
        line-height: 1.15em !important;
    }

    table.body .kg-bookmark-card {
        width: 90vw !important;
    }

    table.body .kg-bookmark-thumbnail {
        display: none !important;
    }

    table.body .kg-bookmark-metadata span {
        font-size: 13px !important;
    }

    table.body .kg-embed-card {
        max-width: 90vw !important;
    }

    table.body h1 {
        font-size: 32px !important;
        line-height: 1.3em !important;
    }

    table.body h2 {
        font-size: 26px !important;
        line-height: 1.22em !important;
    }

    table.body h3 {
        font-size: 21px !important;
        line-height: 1.25em !important;
    }

    table.body h4 {
        font-size: 19px !important;
        line-height: 1.3em !important;
    }

    table.body h5 {
        font-size: 16px !important;
        line-height: 1.4em !important;
    }

    table.body h6 {
        font-size: 16px !important;
        line-height: 1.4em !important;
    }

    table.body blockquote {
        font-size: 17px !important;
        line-height: 1.6em !important;
        margin-bottom: 0 !important;
        padding-left: 15px !important;
    }

    table.body blockquote + * {
        margin-top: 1.5em !important;
    }

    table.body hr {
        margin: 2em 0 !important;
    }

    table.body figcaption,
    table.body figcaption a {
        font-size: 13px !important;
    }

}

/* -------------------------------------
    PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */
@media all {
    .ExternalClass {
        width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
    }

    .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
    }

    #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    .btn-primary table td:hover {
        background-color: #34495e !important;
    }

    .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important;
    }
}


${ templateSettings.showBadge ? `
.footer-powered {
    text-align: center;
    padding-top: 70px;
    padding-bottom: 40px;
}

.gh-powered {
    width: 142px;
    height: 30px;
}
` : ''}

/* ----- ENDIF THE BROWSER ----- */

</style>
</head>

<body class="">
    <span class="preheader">${ post.excerpt ? post.excerpt : `${post.title} – ` }</span>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">

        <!-- Outlook doesn't respect max-width so we need an extra centered table -->
        <!--[if mso]>
        <tr>
            <td>
                <center>
                    <table border="0" cellpadding="0" cellspacing="0" width="600">
        <![endif]-->

        <tr>
            <td>&nbsp;</td>
            <td class="container">
                <td class="content">

                    <!-- START CENTERED WHITE CONTAINER -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" width="100%">

                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                            <td class="wrapper">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">


                                    ${ templateSettings.showSiteHeader ? `
                                    <tr>
                                        <td class="site-info" width="100%" align="center">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td><a href="${site.url}"><img src="${site.logo}" border="0"></a></td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    ` : ''}


                                    <tr>
                                        <td align="center">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                                                <tr>
                                                    <td class="post-meta">
                                                        ${post.published_at} –
                                                        <a href="${post.url}" class="view-online-link">View online →</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="${(templateSettings.bodyFontCategory === 'sans_serif') ? `post-content-sans-serif` : `post-content` }">
                                            <!-- POST CONTENT START -->
                                            ${post.html}
                                            <!-- POST CONTENT END -->
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>

                        <!-- END MAIN CONTENT AREA -->

                        <tr>
                        <td class="wrapper" align="center">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="min-width:100%;border-collapse:collapse">
                            <tbody>
                              <tr>
                                <td style="padding-top:30px;padding-right:18px;padding-bottom:0;padding-left:18px" valign="top" align="center">
                                  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse:separate!important;border-radius:10px;background-color:#007dde">
                                    <tbody>
                                      <tr>
                                        <td align="center" valign="middle" style="font-size:16px;padding:18px">
                                          <a title="SIGN UP" href="${site.url}#/portal/signup" style="font-weight:bold;letter-spacing:normal;line-height:100%;text-align:center;text-decoration:none;color:#ffffff;display:block" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.quickdropmedia.com/">SIGN UP</a>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>

                          <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="display:inline;border-collapse:collapse;padding-top:10px">
                          <tbody>
                            <tr>
                              <td align="left" valign="top" style="padding-right:10px;padding-bottom:0;padding-top:30px">
                                <a href="https://twitter.com/QuickDropMedia" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://quickdropmedia.com"><img src="https://image.flaticon.com/icons/png/128/733/733579.png" alt="Quick Drop Twitter" width="48" style="width:48px;max-width:48px;display:block;border:0;height:auto;outline:none;text-decoration:none"></a>
                              </td>
                              <td align="left" valign="top" style="padding-right:10px;padding-bottom:0;padding-top:30px">
                                <a href="https://www.twitch.tv/quickdropmedia/about" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://quickdropmedia.com"><img src="https://image.flaticon.com/icons/png/128/733/733577.png" alt="Quick Drop Twitch" width="48" style="width:48px;max-width:48px;display:block;border:0;height:auto;outline:none;text-decoration:none"></a>
                              </td>
                              <td align="left" valign="top" style="padding-right:10px;padding-bottom:0;padding-top:30px">
                                <a href="https://www.facebook.com/QuickDropMedia" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://quickdropmedia.com"><img src="https://image.flaticon.com/icons/png/128/733/733547.png" alt="Quick Drop Facebook" width="48" style="width:48px;max-width:48px;display:block;border:0;height:auto;outline:none;text-decoration:none"></a>
                              </td>
                              <td align="left" valign="top" style="padding-right:10px;padding-bottom:0;padding-top:30px">
                                <a href="${site.url}/daily-drops/rss" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://quickdropmedia.com"><img src="https://image.flaticon.com/icons/png/128/733/733569.png" alt="Quick Drop RSS Feed" width="48" style="width:48px;max-width:48px;display:block;border:0;height:auto;outline:none;text-decoration:none"></a>
                              </td>
                            </tr>
                          </tbody>
                          </table>
                         </td>
                        </tr>

                        <tr>
                            <td class="wrapper" align="center">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 20px; padding-bottom: 30px;">
                                    ${iff(!!templateSettings.footerContent, `<tr><td class="footer">${templateSettings.footerContent}</td></tr>`, '')}

                                    <tr><td class="footer">Please reach out to us with any questions, feedback, or advertising inquiries.<br>
                                    We look forward to hearing from you!<br>
                                    Contact: Squad@QuickDropMedia.com<br>
                                    PO Box 112662, Pittsburgh PA, 15241
                                    </td></tr>

                                    <tr><td class="footer">Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></td></tr>

                                    <tr>
                                        <td class="footer">${site.title} &copy; ${date.getFullYear()} – <a href="{{unsubscribe_url}}">Unsubscribe</a></td>
                                    </tr>

                                    ${ templateSettings.showBadge ? `
                                    <tr>
                                        <td class="footer-powered"><a href="https://ghost.org/"><img src="https://static.ghost.org/v4.0.0/images/powered.png" border="0" width="142" height="30" class="gh-powered" alt="Publish with Ghost"></a></td>
                                    </tr>
                                    ` : '' }
                                </table>
                            </td>
                        </tr>

                    </table>
                    <!-- END CENTERED WHITE CONTAINER -->
                </div>
            </td>
            <td>&nbsp;</td>
        </tr>

    <!--[if mso]>
                    </table>
                </center>
            </td>
        </tr>
    <![endif]-->

    </table>
</body>

</html>`;
};
