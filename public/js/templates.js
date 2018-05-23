this["templates"] = this["templates"] || {};
this["templates"]["404"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<h1>Page not found</h1>\n<a href=\"/\">Go to main page</a>\n";
},"useData":true});
Handlebars.registerPartial("form-submit", Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"form-submit f f-align-1-2 f-gap-2\">\n  <button type=\"submit\" class=\"btn btn-primary btn-mw-sm\">"
    + container.escapeExpression(((helper = (helper = helpers["btn-text"] || (depth0 != null ? depth0["btn-text"] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"btn-text","hash":{},"data":data}) : helper)))
    + "</button>\n  <i class=\"fa fa-spinner fa-lg fa-spin\"></i>\n  <span class=\"text-success\">\n    <i class=\"fa fa-check\"></i> Success!\n  </span>\n  <span class=\"text-danger\">\n    <i class=\"fa fa-exclamation-triangle\"></i> Error!\n  </span>\n</div>\n";
},"useData":true}));
this["templates"]["add"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var alias1=container.lambda, alias2=container.escapeExpression;

  return "        <button\n          class=\"editor__presets-item\"\n          data-filter=\""
    + alias2(alias1(depth0, depth0))
    + "\"\n          style=\"background-image:url('img/filters/"
    + alias2(alias1(depth0, depth0))
    + ".png')\">\n          <span>"
    + alias2((helpers.decamelize || (depth0 && depth0.decamelize) || helpers.helperMissing).call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"decamelize","hash":{},"data":data}))
    + "</span>\n        </button>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n  <div id=\"editor\" class=\"editor\">\n    <div class=\"editor__canvas-container\">\n      <i class=\"fa fa-spinner fa-4x fa-spin\"></i>\n    </div>\n\n    <label class=\"editor__uploader\" title=\"Upload picture\">\n      <span class=\"editor__uploader-inner\">\n        <i class=\"fa fa-picture-o\"></i>\n        <i class=\"fa fa-plus\"></i>\n      </span>\n      <input type=\"file\" accept=\"image/*\">\n    </label>\n\n    <div class=\"editor__presets\">\n      <div class=\"editor__presets-track\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.filters : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n    </div>\n\n    <div class=\"editor__caption form-group\">\n      <textarea class=\"form-control\" name=\"caption\" placeholder=\"Caption...\"></textarea>\n    </div>\n\n    <div class=\"editor__controls f f-gap-1 u-mt-2\">\n      <button class=\"editor__reset btn btn-default btn-block\">Reset</button>\n      <button class=\"editor__upload btn btn-success btn-block\">\n        <i class=\"fa fa-upload\"></i> <span>Upload</span>\n      </button>\n    </div>\n\n    <div class=\"editor__progress progress\">\n      <div class=\"progress-bar progress-bar-success progress-bar-striped active\" style=\"width: 40%\"></div>\n    </div>\n\n  </div>\n\n</div>\n";
},"usePartial":true,"useData":true});
this["templates"]["login"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n	<form id=\"login-form\">\n\n		<div class=\"row\">\n			<div class=\"col-sm-6 col-sm-offset-3\">\n\n				<div class=\"form-group\">\n					<label class=\"control-label\">Email</label>\n					<input type=\"text\" class=\"form-control\" name=\"email\">\n					<span class=\"help-block\"></span>\n				</div>\n\n				<div class=\"form-group\">\n					<label class=\"control-label\">Password</label>\n					<input type=\"password\" class=\"form-control\" name=\"password\">\n					<span class=\"help-block\"></span>\n				</div>\n\n				<button type=\"submit\" class=\"btn btn-primary\">Log In</button>\n\n			</div>\n		</div>\n\n	</form>\n\n</div>\n";
},"usePartial":true,"useData":true});
this["templates"]["main"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "<div class=\"feed\" id=\"feed\"></div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<div class=\"welcome-screen\">\r\n	<h1 class=\"welcome-screen__logotype logotype\"><div class=\"sr-only\">Instaprjct</div></h1>\r\n</div>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n"
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.user : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"usePartial":true,"useData":true});
Handlebars.registerPartial("header", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    return "      <a href=\"/add\" class=\"btn btn-default btn-sm\">\n        <i class=\"fa fa-plus\"></i>\n        <span>Add photo</span>\n      </a>\n";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "    <div class=\"header-user dropdown\">\n      <div class=\"header-user__main\" data-toggle=\"dropdown\">\n        <span class=\"header-user__pic\"\n              "
    + ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.photoURL : stack1),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n        </span>\n        "
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.username : stack1), depth0))
    + "\n        <span class=\"caret\"></span>\n      </div>\n\n      <ul class=\"dropdown-menu\">\n        <li><a href=\"/profile\">Profile</a></li>\n        <li><a href=\"/profile/edit\">Edit profile</a></li>\n        <li class=\"divider\"></li>\n        <li><a href=\"/logout\">Logout</a></li>\n      </ul>\n    </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "style=\"background-image:url('"
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.profile : depth0)) != null ? stack1.photoURL : stack1), depth0))
    + "')\"";
},"6":function(container,depth0,helpers,partials,data) {
    return "    <div class=\"header__login\">\n      <a href=\"/login\" class=\"btn btn-default btn-sm btn-mw-sm\">Log In</a>\n      <span>or</span>\n      <a href=\"/signup\" class=\"btn btn-primary btn-sm btn-mw-sm\">Sign Up</a>\n    </div>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<header class=\"header\">\n  <div class=\"header__inner\">\n\n    <div class=\"header__left\">\n      <a href=\"/\" class=\"header__logo logotype\">\n        <span class=\"sr-only\">Instaprjct</span>\n      </a>\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.user : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.profile : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "")
    + "\n  </div>\n</header>\n";
},"useData":true}));
this["templates"]["profile-edit"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression, alias5=container.lambda;

  return "  <div class=\"profile\">\n    <div class=\"u-mb-4\">\n      <a class=\"btn btn-default btn-sm\" href=\"/profile\">\n        <i class=\"fa fa-arrow-left\"></i>\n        <span>Profile</span>\n      </a>\n    </div>\n\n    <div class=\"profile__left\">\n\n      <form class=\"profile-picture\" id=\"profile-picture\">\n        <div class=\"profile-picture__picture\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.photoURL : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <label class=\"profile-picture__trigger\" title=\"Change picture\">\n            <span>Choose a new picture</span>\n            <input type=\"file\" name=\"picture\" accept=\"image/*\">\n          </label>\n        </div>\n\n        <div class=\"profile-picture__error alert alert-danger\"></div>\n\n        <div class=\"profile-picture__actions f f-gap-2 f-align-1-2\">\n          <button class=\"btn btn-success btn-sm btn-block\" data-action=\"save\">\n            <i class=\"fa fa-upload\"></i> Save\n          </button>\n\n          <button class=\"btn btn-danger btn-sm btn-block u-my-0\" data-action=\"cancel\">\n            <i class=\"fa fa-ban\"></i> Cancel\n          </button>\n        </div>\n\n        <div class=\"progress\">\n          <div class=\"progress-bar progress-bar-success progress-bar-striped active\"></div>\n        </div>\n      </form>\n\n    </div>\n\n    <div class=\"profile__body\">\n\n      <div class=\"profile__errors alert alert-danger\" hidden></div>\n\n      <form class=\"form panel panel-default\" id=\"public-info\" novalidate>\n        <header class=\"panel-heading\">\n          <h3 class=\"panel-title\">Public information</h3>\n        </header>\n\n        <div class=\"panel-body\">\n\n          <div class=\"form-group\">\n            <label>Username</label>\n            <div class=\"form-control\"readonly>"
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "</div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Display Name</label>\n            <input\n              type=\"text\"\n              name=\"displayName\"\n              class=\"form-control\"\n              value=\""
    + alias4(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n\n          <div class=\"form-group\">\n            <label>Phone</label>\n            <input\n              type=\"tel\"\n              name=\"phoneNumber\"\n              class=\"form-control\"\n              value=\""
    + alias4(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + "\">\n          </div>\n\n          <div class=\"form-group\">\n            <label>About me</label>\n            <textarea\n              class=\"form-control\"\n              name=\"about\">"
    + alias4(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"about","hash":{},"data":data}) : helper)))
    + "</textarea>\n          </div>\n\n          <hr>\n\n          <div class=\"form-group\">\n            <label>Twitter</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-twitter\"></i></span>\n              <input\n                type=\"text\"\n                name=\"social[twitter]\"\n                class=\"form-control\"\n                value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.social : depth0)) != null ? stack1.twitter : stack1), depth0))
    + "\">\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Facebook</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-facebook\"></i></span>\n              <input\n                type=\"text\"\n                name=\"social[facebook]\"\n                class=\"form-control\"\n                value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.social : depth0)) != null ? stack1.facebook : stack1), depth0))
    + "\">\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label>Vkontakte</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-vk\"></i></span>\n              <input\n                type=\"text\"\n                name=\"social[vkontakte]\"\n                class=\"form-control\"\n                value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.social : depth0)) != null ? stack1.vkontakte : stack1), depth0))
    + "\">\n            </div>\n          </div>\n\n          <div class=\"form-group\">\n            <label> Personal website</label>\n            <div class=\"input-group\">\n              <span class=\"input-group-addon\"><i class=\"fa fa-globe\"></i></span>\n              <input\n                type=\"text\"\n                name=\"social[website]\"\n                class=\"form-control\"\n                value=\""
    + alias4(alias5(((stack1 = (depth0 != null ? depth0.social : depth0)) != null ? stack1.website : stack1), depth0))
    + "\">\n            </div>\n          </div>\n\n        </div>\n        <footer class=\"panel-footer\">\n          <div class=\"f f-align-13-2\">\n"
    + ((stack1 = container.invokePartial(partials["form-submit"],depth0,{"name":"form-submit","hash":{"btn-text":"Save"},"data":data,"indent":"            ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "          </div>\n        </footer>\n      </form>\n\n      <form class=\"panel panel-danger\" id=\"delete-profile\">\n        <header class=\"panel-heading\">\n          <h3 class=\"panel-title\">\n            Delete account\n          </h3>\n        </header>\n        <div class=\"panel-body\">\n          <p class=\"text-danger\">\n            Attention!!!\n            Once you delete your account, there is no going back.\n            Please be certain.\n          </p>\n          <p>For confirm account deletion you should enter your username into this field:</p>\n          <div class=\"row\">\n            <div class=\"col-xs-9 u-pr-0\">\n              <input type=\"hidden\" value=\""
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + "\" name=\"username\">\n              <div class=\"form-group u-mb-0\">\n                <input type=\"text\" class=\"form-control\" name=\"usernameConfirm\">\n              </div>\n            </div>\n            <div class=\"col-xs-3\">\n              <button class=\"btn btn-danger btn-block\">Delete</button>\n            </div>\n          </div>\n        </div>\n      </form>\n\n    </div>\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "')\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n"
    + ((stack1 = helpers["with"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.profile : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>\n";
},"usePartial":true,"useData":true});
Handlebars.registerPartial("post", Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "				<img src=\""
    + container.escapeExpression(container.lambda(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.photoURL : stack1), depth0))
    + "\" alt=\"Users avatar picture\">\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "				<img src=\"img/user.svg\" alt=\"Default users avatar picture\">\r\n";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "		<ul class=\"post__comments-list\">\r\n"
    + ((stack1 = helpers.each.call(alias1,(helpers.sortBy || (depth0 && depth0.sortBy) || helpers.helperMissing).call(alias1,(depth0 != null ? depth0.comments : depth0),"created",{"name":"sortBy","hash":{},"data":data}),{"name":"each","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</ul>\r\n";
},"6":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression, alias3=depth0 != null ? depth0 : (container.nullContext || {}), alias4=helpers.helperMissing;

  return "				<li class=\"comment\" data-comment=\""
    + alias2(alias1((depth0 != null ? depth0.id : depth0), depth0))
    + "\">\r\n					<span class=\"comment__author\">"
    + alias2(alias1((depth0 != null ? depth0.author : depth0), depth0))
    + "</span>\r\n					<span class=\"comment__text\">"
    + alias2(alias1((depth0 != null ? depth0.value : depth0), depth0))
    + "</span>\r\n					<small class=\"comment__time\">"
    + alias2((helpers.formatDate || (depth0 && depth0.formatDate) || alias4).call(alias3,(depth0 != null ? depth0.created : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</small>\r\n"
    + ((stack1 = (helpers.ifCond || (depth0 && depth0.ifCond) || alias4).call(alias3,((stack1 = (depths[1] != null ? depths[1].currentUser : depths[1])) != null ? stack1.uid : stack1),"===",(depth0 != null ? depth0.authorId : depth0),{"name":"ifCond","hash":{},"fn":container.program(7, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "				</li>\r\n";
},"7":function(container,depth0,helpers,partials,data) {
    return "						<button class=\"comment__delete\" title=\"Remove\">\r\n							<span class=\"fa fa-times\"></span>\r\n						</button>\r\n";
},"9":function(container,depth0,helpers,partials,data) {
    return "fa-heart";
},"11":function(container,depth0,helpers,partials,data) {
    return "fa-heart-o";
},"13":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				<span>"
    + container.escapeExpression(((helper = (helper = helpers.likesCount || (depth0 != null ? depth0.likesCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"likesCount","hash":{},"data":data}) : helper)))
    + "</span>\r\n";
},"15":function(container,depth0,helpers,partials,data) {
    return "custom-icon--broken-heart-active";
},"17":function(container,depth0,helpers,partials,data) {
    return "custom-icon--broken-heart";
},"19":function(container,depth0,helpers,partials,data) {
    var helper;

  return "				<span>"
    + container.escapeExpression(((helper = (helper = helpers.dislikesCount || (depth0 != null ? depth0.dislikesCount : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"dislikesCount","hash":{},"data":data}) : helper)))
    + "</span>\r\n";
},"21":function(container,depth0,helpers,partials,data) {
    return "			<button class=\"post__delete btn btn-danger btn-xs\" title=\"Delete\">\r\n				<span class=\"fa fa-trash\"></span>\r\n				<span>Delete</span>\r\n			</button>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.escapeExpression, alias3=helpers.helperMissing, alias4="function";

  return "<header class=\"post__header\">\r\n	<div class=\"post__author\">\r\n		<div class=\"post__author-pic\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.photoURL : stack1),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.program(3, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "		</div>\r\n		<span class=\"post__author-name\">"
    + alias2(container.lambda(((stack1 = (depth0 != null ? depth0.author : depth0)) != null ? stack1.username : stack1), depth0))
    + "</span>\r\n	</div>\r\n	<span class=\"post__time\">"
    + alias2((helpers.formatDate || (depth0 && depth0.formatDate) || alias3).call(alias1,(depth0 != null ? depth0.created : depth0),{"name":"formatDate","hash":{},"data":data}))
    + "</span>\r\n</header>\r\n\r\n<div class=\"post__content\">\r\n	<img src=\""
    + alias2(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" alt=\""
    + alias2(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "\">\r\n</div>\r\n\r\n<footer class=\"post__footer\">\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.comments : depth0),{"name":"if","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	<div class=\"f f-align-1-2\">\r\n		<button class=\"post__like\">\r\n			<span class=\"fa "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.liked : depth0),{"name":"if","hash":{},"fn":container.program(9, data, 0, blockParams, depths),"inverse":container.program(11, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\"></span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.likesCount : depth0),{"name":"if","hash":{},"fn":container.program(13, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</button>\r\n		<button class=\"post__dislike\">\r\n			<span class=\"custom-icon "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.disliked : depth0),{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams, depths),"inverse":container.program(17, data, 0, blockParams, depths),"data":data})) != null ? stack1 : "")
    + "\">\r\n		      <svg fill=\"#231F20\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 512 512\"><g><path\r\n				      d=\"M469.7 74.3c-51.1-51.1-131-55.7-187.4-14 4.9 8 10 16 14.7 24.1 9.3 15.4 17.9 31 26.4 46.7 8.7 15.6 17.1 31.4 25.3 47.2l10 19.4-21 11.8c-39.7 22.3-80.1 43.1-121 63.1 11.3 37.4 21.8 75 31 113.1 3 11.3 5.3 22.8 7.8 34.3 2.5 11.4 5.1 22.9 7.2 34.5 1.6 8.2 3 16.5 4.5 24.7 4.4-3.5 8.7-7.1 12.8-11.2l189.9-189.9c56.1-56.2 56.1-147.5-.2-203.8z\"/><path\r\n				      d=\"M225.9 429.8c-4.8-10.7-9.9-21.3-14.3-32.1-18.5-43-35.5-86.5-51-130.5l-7.4-20.9 20.5-10.7c40.4-21.1 81.5-41 123.1-59.8-3.5-9.3-7.2-18.5-10.6-27.9-6.2-16.7-12.3-33.6-17.8-50.6-2.2-6.5-4.1-13-6.2-19.5l-4.3 4.3-10.1-7.9C191.4 18 97.9 18 41.6 74.3c-56.3 56.3-55.2 147.6 1.1 203.9l191 189.9c5 5 10.7 9.4 17 13.4-3.3-6.6-6.7-13.1-9.9-19.7-5.3-10.6-10.1-21.3-14.9-32z\"/></g></svg>\r\n	        </span>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.dislikesCount : depth0),{"name":"if","hash":{},"fn":container.program(19, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "		</button>\r\n		<form class=\"post__add-comment\">\r\n			<input type=\"text\" name=\"comment\" placeholder=\"Add a comment...\">\r\n		</form>\r\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isOwner : depth0),{"name":"if","hash":{},"fn":container.program(21, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "	</div>\r\n</footer>\r\n";
},"useData":true,"useDepths":true}));
this["templates"]["profile-show"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "  <div class=\"profile profile--show\">\n    <div class=\"profile__pic\""
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.photoURL : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "></div>\n\n    <p class=\"profile__name\">\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.displayName : depth0),{"name":"if","hash":{},"fn":container.program(4, data, 0, blockParams),"inverse":container.program(6, data, 0, blockParams),"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </p>\n\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.publicEmail : depth0),{"name":"if","hash":{},"fn":container.program(8, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.phoneNumber : depth0),{"name":"if","hash":{},"fn":container.program(10, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.about : depth0),{"name":"if","hash":{},"fn":container.program(12, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n    <ul class=\"profile__social\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.social : depth0),{"name":"each","hash":{},"fn":container.program(14, data, 2, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "    </ul>\n\n    <a href=\"/profile/edit\" class=\"btn btn-default\">\n      <i class=\"fa fa-pencil\"></i>\n      <span>Edit profile</span>\n    </a>\n  </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return " style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "')\"";
},"4":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      "
    + alias4(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data}) : helper)))
    + " <br> <small>("
    + alias4(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"username","hash":{},"data":data}) : helper)))
    + ")</small>\n";
},"6":function(container,depth0,helpers,partials,data) {
    var helper;

  return "      "
    + container.escapeExpression(((helper = (helper = helpers.username || (depth0 != null ? depth0.username : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"username","hash":{},"data":data}) : helper)))
    + "\n";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <p class=\"profile__email\">\n      <a href=\"mailto:"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fa fa-envelope-o\"></i> "
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</a>\n    </p>\n";
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <p class=\"profile__phone\">\n      <a href=\"tel:"
    + alias4(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + "\"><i class=\"fa fa-phone\"></i> "
    + alias4(((helper = (helper = helpers.phoneNumber || (depth0 != null ? depth0.phoneNumber : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"phoneNumber","hash":{},"data":data}) : helper)))
    + "</a>\n    </p>\n";
},"12":function(container,depth0,helpers,partials,data) {
    var helper;

  return "    <p class=\"profile__about\">"
    + container.escapeExpression(((helper = (helper = helpers.about || (depth0 != null ? depth0.about : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"about","hash":{},"data":data}) : helper)))
    + "</p>\n";
},"14":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),blockParams[0][0],{"name":"if","hash":{},"fn":container.program(15, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "");
},"15":function(container,depth0,helpers,partials,data,blockParams) {
    var alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "      <li><a href=\""
    + alias3((helpers.socialLinkFor || (depth0 && depth0.socialLinkFor) || alias2).call(alias1,blockParams[1][1],blockParams[1][0],{"name":"socialLinkFor","hash":{},"data":data,"blockParams":blockParams}))
    + "\" target=\"_blank\" title=\""
    + alias3((helpers.socialLinkFor || (depth0 && depth0.socialLinkFor) || alias2).call(alias1,blockParams[1][1],blockParams[1][0],{"name":"socialLinkFor","hash":{},"data":data,"blockParams":blockParams}))
    + "\">\n        <i class=\""
    + alias3((helpers.socialIconFor || (depth0 && depth0.socialIconFor) || alias2).call(alias1,blockParams[1][1],{"name":"socialIconFor","hash":{},"data":data,"blockParams":blockParams}))
    + "\"></i>\n      </a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"blockParams":blockParams,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n"
    + ((stack1 = helpers["with"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.profile : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0, blockParams),"inverse":container.noop,"data":data,"blockParams":blockParams})) != null ? stack1 : "")
    + "\n</div>\n";
},"usePartial":true,"useData":true,"useBlockParams":true});
this["templates"]["profile"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <form class=\"profile\" id=\"edit-profile\">\n      <div class=\"profile__left\">\n        <div class=\"profile__pic\" "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.photoURL : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n          <label class=\"profile__pic-uploader\" title=\"Change picture\">\n            <input type=\"file\" name=\"picture\" accept=\"image/*\">\n          </label>\n        </div>\n      </div>\n\n      <div class=\"profile__body\">\n\n        <div class=\"profile__errors alert alert-danger\" hidden></div>\n\n        <div class=\"panel panel-default\">\n          <header class=\"panel-heading\">\n            <h3 class=\"panel-title\">Common info</h3>\n          </header>\n          <div class=\"panel-body\">\n\n            <div class=\"form-group\">\n              <label for=\"name\">Name</label>\n              <input type=\"text\" name=\"name\" class=\"form-control\" value=\""
    + alias4(((helper = (helper = helpers.displayName || (depth0 != null ? depth0.displayName : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"displayName","hash":{},"data":data}) : helper)))
    + "\" readonly>\n            </div>\n\n            <div class=\"form-group\">\n              <label>Email</label>\n              <div class=\"form-control\" readonly>"
    + alias4(((helper = (helper = helpers.email || (depth0 != null ? depth0.email : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"email","hash":{},"data":data}) : helper)))
    + "</div>\n            </div>\n\n            <div class=\"form-group\">\n              <label>UID</label>\n              <div class=\"form-control\" readonly>"
    + alias4(((helper = (helper = helpers.uid || (depth0 != null ? depth0.uid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uid","hash":{},"data":data}) : helper)))
    + "</div>\n            </div>\n\n          </div>\n\n          <div class=\"panel-footer\">\n\n            <div class=\"profile__actions\">\n              <button class=\"btn btn-default btn-mw-sm\" data-profile-action=\"edit\">\n                <i class=\"fa fa-pencil\"></i>\n                <span>Edit</span>\n              </button>\n            </div>\n\n            <div class=\"profile__actions profile__actions--edit\">\n              <div class=\"f f-gap-3 f-align-1-2\">\n                <button class=\"btn btn-primary btn-mw-sm\" data-profile-action=\"save\">\n                  <i class=\"fa fa-trash\"></i>\n                  <span>Save</span>\n                </button>\n\n                <button class=\"btn btn-default btn-mw-sm\" data-profile-action=\"cancel\">\n                  <i class=\"fa fa-trash\"></i>\n                  <span>Cancel</span>\n                </button>\n\n                <i class=\"fa fa-spinner fa-lg fa-spin\"></i>\n              </div>\n\n              <button class=\"btn btn-danger btn-mw-sm\" data-profile-action=\"delete\">\n                <i class=\"fa fa-trash\"></i>\n                <span>Delete account</span>\n              </button>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </form>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper;

  return "style=\"background-image: url('"
    + container.escapeExpression(((helper = (helper = helpers.photoURL || (depth0 != null ? depth0.photoURL : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"photoURL","hash":{},"data":data}) : helper)))
    + "')\"";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\n\n  <div class=\"container\">\n"
    + ((stack1 = helpers["with"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.user : depth0),{"name":"with","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n</div>\n";
},"usePartial":true,"useData":true});
this["templates"]["signup"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.header,depth0,{"name":"header","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"container-fluid\">\r\n\r\n	<form id=\"signup-form\" class=\"form\">\r\n\r\n		<div class=\"row\">\r\n			<div class=\"col-sm-6 col-sm-offset-3\">\r\n\r\n				<ul id=\"errors\" class=\"list-group\" hidden></ul>\r\n\r\n				<div class=\"form-group\">\r\n					<label class=\"control-label\">Email</label>\r\n					<input type=\"text\" class=\"form-control\" name=\"email\">\r\n					<span class=\"help-block\"></span>\r\n				</div>\r\n\r\n				<div class=\"form-group\">\r\n					<label class=\"control-label\">Username</label>\r\n					<input type=\"text\" class=\"form-control\" name=\"username\">\r\n					<span class=\"help-block\"></span>\r\n				</div>\r\n\r\n				<div class=\"form-group\">\r\n					<label class=\"control-label\">Name</label>\r\n					<input type=\"text\" class=\"form-control\" name=\"displayName\">\r\n					<span class=\"help-block\"></span>\r\n				</div>\r\n\r\n				<div class=\"form-group\">\r\n					<label class=\"control-label\">Password</label>\r\n					<input type=\"password\" class=\"form-control\" name=\"password\">\r\n					<span class=\"help-block\"></span>\r\n				</div>\r\n\r\n				<div class=\"form-group\">\r\n					<label class=\"control-label\">Confirm password</label>\r\n					<input type=\"password\" class=\"form-control\" name=\"passwordConfirm\">\r\n					<span class=\"help-block\"></span>\r\n				</div>\r\n\r\n"
    + ((stack1 = container.invokePartial(partials["form-submit"],depth0,{"name":"form-submit","hash":{"btn-text":"Sign Up"},"data":data,"indent":"\t\t\t\t","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "\r\n			</div>\r\n		</div>\r\n\r\n	</form>\r\n\r\n</div>\r\n";
},"usePartial":true,"useData":true});
this["templates"]["preloader"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<div class=\"container-fluid\">\n  <div class=\"f f-align-2-2\" style=\"height: 300px\">\n    <div class=\"fa fa-spinner fa-spin fa-5x\"></div>\n  </div>\n</div>\n";
},"useData":true});