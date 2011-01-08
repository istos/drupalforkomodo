/**
 * drupal.js: quick Komodo extension for developing drupal modules
 *
 * Author: Jeff Griffiths ( jeff@canuckistani.ca )
 * 
 */

if(typeof(KoDrupal) == 'undefined') {
    var KoDrupal = {};
}

(function() {

this.os = Components.classes['@activestate.com/koOs;1'].
    getService(Components.interfaces.koIOs);

this.koDirs = Components.classes['@activestate.com/koDirs;1'].
    getService(Components.interfaces.koIDirs);

this.editCix = function() {
    var base = this.koDirs.hostUserDataDir;
    var arr = [base, 'XRE', 'extensions', 'drupal@canuckistani.ca', 'apicatalogs', 'drupalnode.cix'];
    var cix_file_path = this.os.path.joinlist(arr.length, arr);
    ko.open.URI(cix_file_path);
}

/*
 * newModule
 * @param strName {String}
 */

this.newModule = function() {
    var name = ko.dialogs.prompt('Foo');
    alert(name);
    var modulesDir = ko.filepicker
        .getFolder(false, 'Please browse to your Drupal modules directory');
    alert(modulesDir);
    
}

/*
 * openCfgDialog
 */

this.openCfgDialog = function() {
    window.openDialog(
        this.Dialog.getFile().URI,
        "_blank",
        "centerscreen,chrome,resizable,scrollbars,dialog=no,close,modal=yes",
        data
    );
}

/*
 * newHook
 */

this.newHook = function(strName) {
    //
}

/*
 * _newProjectFromTemplate
 * @param tplPath {String}
 * @param strName {String}
 */

this._newProjectFromTemplate = function(tplPath, strName, baseDir) {
    var obj = new Object();
    obj.type = "project";
    var projectPath = os.path.join(baseDir, strName+'kpf');
    obj.filename = projectPath;
    obj.template = tplPath;
    
    var uri = ko.uriparse.localPathToURI(obj.filename);
    var extractLocation = baseDir;
    
    var packager = Components.classes["@activestate.com/koProjectPackageService;1"]
                           .getService(Components.interfaces.koIProjectPackageService);
    var project = packager.newProjectFromPackage(obj.template, extractLocation);
    project.url = uri;
 
    var ok = this._saveNewProject(project);
    if (ok) {
        var macro = project.getChildWithTypeAndStringAttribute('macro', 'name', 'oncreate', 1);
        if (macro) {
            ko.projects.executeMacro(macro);
        }
    }
    return;
}
  
}).apply(KoDrupal);
