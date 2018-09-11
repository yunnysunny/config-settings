## Modules

<dl>
<dt><a href="#module_config-settings">config-settings</a></dt>
<dd><p>The module of config-settings</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#KeyItem">KeyItem</a> : <code>String</code></dt>
<dd><p>The item from configure object. It can be a format of ordinary string , such as <code>field</code>; also can be a nested string, such as <code>fieldParent.filedSub.fieldSubSub</code>.</p>
</dd>
</dl>

<a name="module_config-settings"></a>

## config-settings
The module of config-settings


* [config-settings](#module_config-settings)
    * [.init(configObj, options)](#module_config-settings.init) ⇒ <code>this</code>
    * [.setAlarm(alarm)](#module_config-settings.setAlarm)
    * [.loadVar(key)](#module_config-settings.loadVar) ⇒ <code>String</code> \| <code>Object</code>
    * [.loadNecessaryVar(key)](#module_config-settings.loadNecessaryVar) ⇒ <code>String</code> \| <code>Object</code>
    * [.loadNecessaryString(key)](#module_config-settings.loadNecessaryString) ⇒ <code>String</code>
    * [.loadNecessaryInt(key)](#module_config-settings.loadNecessaryInt) ⇒ <code>Integer</code>
    * [.loadNecessaryObject(key)](#module_config-settings.loadNecessaryObject) ⇒ <code>Object</code>
    * [.loadNecessaryFile(key, [onlyCheckDirectory])](#module_config-settings.loadNecessaryFile) ⇒ <code>String</code>
    * [.loadNecessaryDirectory(key, [endWithSeparator])](#module_config-settings.loadNecessaryDirectory) ⇒ <code>String</code>
    * [.loadNecessaryUrl(key, [endWithSeparator])](#module_config-settings.loadNecessaryUrl) ⇒ <code>String</code>

<a name="module_config-settings.init"></a>

### config-settings.init(configObj, options) ⇒ <code>this</code>
Init the config-settings

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type | Description |
| --- | --- | --- |
| configObj | <code>Object</code> | The configure object. |
| options | <code>Object</code> |  |
| [options.alarm] | <code>Object</code> | The alarm object, it should has the function of `sendAll`. |

<a name="module_config-settings.setAlarm"></a>

### config-settings.setAlarm(alarm)
Set the alarm object

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type |
| --- | --- |
| alarm | <code>Object</code> | 

<a name="module_config-settings.loadVar"></a>

### config-settings.loadVar(key) ⇒ <code>String</code> \| <code>Object</code>
Get value by key

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="module_config-settings.loadNecessaryVar"></a>

### config-settings.loadNecessaryVar(key) ⇒ <code>String</code> \| <code>Object</code>
Get value by key, the value must be exist, otherwise the process will exit.

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="module_config-settings.loadNecessaryString"></a>

### config-settings.loadNecessaryString(key) ⇒ <code>String</code>
Get string value by key, the value must be exist, otherwise the process will exit.

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="module_config-settings.loadNecessaryInt"></a>

### config-settings.loadNecessaryInt(key) ⇒ <code>Integer</code>
Get integer value by key, the value must be exist, otherwise the process will exit.

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="module_config-settings.loadNecessaryObject"></a>

### config-settings.loadNecessaryObject(key) ⇒ <code>Object</code>
Get object value by key, the value must be exist, otherwise the process will exit.

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="module_config-settings.loadNecessaryFile"></a>

### config-settings.loadNecessaryFile(key, [onlyCheckDirectory]) ⇒ <code>String</code>
Get file path by key, the value must be exist, otherwise the process will exit.

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [onlyCheckDirectory] | <code>Boolean</code> | <code>false</code> | If set true, only check whether the directory that the file saved is exist. |

<a name="module_config-settings.loadNecessaryDirectory"></a>

### config-settings.loadNecessaryDirectory(key, [endWithSeparator]) ⇒ <code>String</code>
Get directory path by key, the value must be exist, otherwise the process will exit.

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [endWithSeparator] | <code>Boolean</code> | <code>false</code> | If set ture, the key must be end with `/`(Linux) or `\`(Windows). |

<a name="module_config-settings.loadNecessaryUrl"></a>

### config-settings.loadNecessaryUrl(key, [endWithSeparator]) ⇒ <code>String</code>
Get URL by key, the value must be exist, otherwise the process will exit.

**Kind**: static method of [<code>config-settings</code>](#module_config-settings)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [endWithSeparator] | <code>Boolean</code> | <code>false</code> | If set ture, the key must be end with `/`. |

<a name="KeyItem"></a>

## KeyItem : <code>String</code>
The item from configure object. It can be a format of ordinary string , such as `field`; also can be a nested string, such as `fieldParent.filedSub.fieldSubSub`.

**Kind**: global typedef  
