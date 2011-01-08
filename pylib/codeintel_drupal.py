#!/usr/bin/env python

import os
import sys
import logging
import re

from codeintel2.common import *
from codeintel2.hooks import HookHandler
import ciElementTree as ET
from codeintel2.tree import pretty_tree_from_tree


try:
    from xpcom.server import UnwrapObject
    _xpcom_ = True
except ImportError:
    _xpcom_ = False

#---- globals

log = logging.getLogger("codeintel.CakePHP")

# main class

class DrupalHookHandler(HookHandler):
    name = "Drupal"
    langs = ["PHP"]
    
    def post_db_load_blob(self, blob):
        filepath = blob.get("src", "")
        child_nodes = blob.getchildren()
        
        for item in child_nodes:
            name = item.get('name')
            
            if name == 'node':
                item.set('citdl', 'DrupalNode')
            if name == 'user' or name == 'account':
                item.set('citdl',  'DrupalUser')
        
        
# registration
def register(mgr):
    mgr.add_hook_handler(DrupalHookHandler(mgr))