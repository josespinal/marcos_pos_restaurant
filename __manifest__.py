# -*- coding: utf-8 -*-
{
    'name': "marcos_pos_restaurant",

    'summary': """
        Custom POS Restaurant actions and views""",

    'description': """
        Custom POS Restaurant actions and views
    """,

    'author': "Jose Espinal",
    'website': "http://www.industria.com.do",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/12.0/odoo/addons/base/data/ir_module_category_data.xml
    # for the full list
    'category': 'Point of Sale',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['pos_restaurant'],

    # always loaded
    'data': [
        'views/templates.xml',
    ],
    'qweb': [
        'static/src/xml/*.xml'
    ]
}
