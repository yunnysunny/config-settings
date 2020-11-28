## Classes

<dl>
<dt><a href="#AbstractConfig">AbstractConfig</a></dt>
<dd></dd>
<dt><a href="#ConsulConfig">ConsulConfig</a> ⇐ <code><a href="#AbstractConfig">AbstractConfig</a></code></dt>
<dd></dd>
<dt><a href="#JsonConfig">JsonConfig</a> ⇐ <code><a href="#AbstractConfig">AbstractConfig</a></code></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#KeyItem">KeyItem</a> : <code>String</code></dt>
<dd><p>The item from configure object. It can be a format of ordinary string , such as <code>field</code>; also can be a nested string, such as <code>fieldParent.filedSub.fieldSubSub</code> in Json mode or <code>fieldParent/filedSub/fieldSubSub</code> in consul mode.</p>
</dd>
</dl>

<a name="AbstractConfig"></a>

## *AbstractConfig*
**Kind**: global abstract class  

* *[AbstractConfig](#AbstractConfig)*
    * *[.allLoaded()](#AbstractConfig+allLoaded) ⇒ <code>Promise</code>*
    * **[._loadVar(key)](#AbstractConfig+_loadVar) ⇒ <code>any</code>**
    * *[.loadVar(key)](#AbstractConfig+loadVar) ⇒ <code>String</code> \| <code>Object</code> \| <code>Promise</code>*
    * *[.loadNecessaryVar(key)](#AbstractConfig+loadNecessaryVar) ⇒ <code>String</code> \| <code>Object</code>*
    * *[.loadNecessaryString(key)](#AbstractConfig+loadNecessaryString) ⇒ <code>String</code>*
    * *[.loadNecessaryInt(key)](#AbstractConfig+loadNecessaryInt) ⇒ <code>Integer</code>*
    * *[.loadNecessaryObject(key)](#AbstractConfig+loadNecessaryObject) ⇒ <code>Promise</code> \| <code>Object</code>*
    * *[.loadNecessaryFile(key, [onlyCheckDirectory])](#AbstractConfig+loadNecessaryFile) ⇒ <code>Promise</code> \| <code>String</code>*
    * *[.loadNecessaryDirectory(key, [endWithSeparator])](#AbstractConfig+loadNecessaryDirectory) ⇒ <code>Promise</code> \| <code>String</code>*
    * *[.loadNecessaryUrl(key, [endWithSeparator])](#AbstractConfig+loadNecessaryUrl) ⇒ <code>Promise</code> \| <code>String</code>*

<a name="AbstractConfig+allLoaded"></a>

### *abstractConfig.allLoaded() ⇒ <code>Promise</code>*
Check if all loading has been finished.

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  
<a name="AbstractConfig+_loadVar"></a>

### **abstractConfig.\_loadVar(key) ⇒ <code>any</code>**
**Kind**: instance abstract method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="AbstractConfig+loadVar"></a>

### *abstractConfig.loadVar(key) ⇒ <code>String</code> \| <code>Object</code> \| <code>Promise</code>*
Get value by key

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryVar"></a>

### *abstractConfig.loadNecessaryVar(key) ⇒ <code>String</code> \| <code>Object</code>*
Get value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryString"></a>

### *abstractConfig.loadNecessaryString(key) ⇒ <code>String</code>*
Get string value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryInt"></a>

### *abstractConfig.loadNecessaryInt(key) ⇒ <code>Integer</code>*
Get integer value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryObject"></a>

### *abstractConfig.loadNecessaryObject(key) ⇒ <code>Promise</code> \| <code>Object</code>*
Get object value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryFile"></a>

### *abstractConfig.loadNecessaryFile(key, [onlyCheckDirectory]) ⇒ <code>Promise</code> \| <code>String</code>*
Get file path by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [onlyCheckDirectory] | <code>Boolean</code> | <code>false</code> | If set true, only check whether the directory that the file saved is exist. |

<a name="AbstractConfig+loadNecessaryDirectory"></a>

### *abstractConfig.loadNecessaryDirectory(key, [endWithSeparator]) ⇒ <code>Promise</code> \| <code>String</code>*
Get directory path by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [endWithSeparator] | <code>Boolean</code> | <code>false</code> | If set ture, the key must be end with `/`(Linux) or `\`(Windows). |

<a name="AbstractConfig+loadNecessaryUrl"></a>

### *abstractConfig.loadNecessaryUrl(key, [endWithSeparator]) ⇒ <code>Promise</code> \| <code>String</code>*
Get URL by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>AbstractConfig</code>](#AbstractConfig)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [endWithSeparator] | <code>Boolean</code> | <code>false</code> | If set ture, the key must be end with `/`. |

<a name="ConsulConfig"></a>

## ConsulConfig ⇐ [<code>AbstractConfig</code>](#AbstractConfig)
**Kind**: global class  
**Extends**: [<code>AbstractConfig</code>](#AbstractConfig)  

* [ConsulConfig](#ConsulConfig) ⇐ [<code>AbstractConfig</code>](#AbstractConfig)
    * [new ConsulConfig(option)](#new_ConsulConfig_new)
    * [.allLoaded()](#AbstractConfig+allLoaded) ⇒ <code>Promise</code>
    * [.loadVar(key)](#AbstractConfig+loadVar) ⇒ <code>String</code> \| <code>Object</code> \| <code>Promise</code>
    * [.loadNecessaryVar(key)](#AbstractConfig+loadNecessaryVar) ⇒ <code>String</code> \| <code>Object</code>
    * [.loadNecessaryString(key)](#AbstractConfig+loadNecessaryString) ⇒ <code>String</code>
    * [.loadNecessaryInt(key)](#AbstractConfig+loadNecessaryInt) ⇒ <code>Integer</code>
    * [.loadNecessaryObject(key)](#AbstractConfig+loadNecessaryObject) ⇒ <code>Promise</code> \| <code>Object</code>
    * [.loadNecessaryFile(key, [onlyCheckDirectory])](#AbstractConfig+loadNecessaryFile) ⇒ <code>Promise</code> \| <code>String</code>
    * [.loadNecessaryDirectory(key, [endWithSeparator])](#AbstractConfig+loadNecessaryDirectory) ⇒ <code>Promise</code> \| <code>String</code>
    * [.loadNecessaryUrl(key, [endWithSeparator])](#AbstractConfig+loadNecessaryUrl) ⇒ <code>Promise</code> \| <code>String</code>

<a name="new_ConsulConfig_new"></a>

### new ConsulConfig(option)

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> |  |
| option.consulAddr | <code>String</code> | The consul address, in the format of `ip:port`。 |
| option.pathPerfix | <code>String</code> | The perfix of consul key element. |

<a name="AbstractConfig+allLoaded"></a>

### consulConfig.allLoaded() ⇒ <code>Promise</code>
Check if all loading has been finished.

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>allLoaded</code>](#AbstractConfig+allLoaded)  
<a name="AbstractConfig+loadVar"></a>

### consulConfig.loadVar(key) ⇒ <code>String</code> \| <code>Object</code> \| <code>Promise</code>
Get value by key

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>loadVar</code>](#AbstractConfig+loadVar)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryVar"></a>

### consulConfig.loadNecessaryVar(key) ⇒ <code>String</code> \| <code>Object</code>
Get value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>loadNecessaryVar</code>](#AbstractConfig+loadNecessaryVar)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryString"></a>

### consulConfig.loadNecessaryString(key) ⇒ <code>String</code>
Get string value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>loadNecessaryString</code>](#AbstractConfig+loadNecessaryString)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryInt"></a>

### consulConfig.loadNecessaryInt(key) ⇒ <code>Integer</code>
Get integer value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>loadNecessaryInt</code>](#AbstractConfig+loadNecessaryInt)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryObject"></a>

### consulConfig.loadNecessaryObject(key) ⇒ <code>Promise</code> \| <code>Object</code>
Get object value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>loadNecessaryObject</code>](#AbstractConfig+loadNecessaryObject)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryFile"></a>

### consulConfig.loadNecessaryFile(key, [onlyCheckDirectory]) ⇒ <code>Promise</code> \| <code>String</code>
Get file path by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>loadNecessaryFile</code>](#AbstractConfig+loadNecessaryFile)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [onlyCheckDirectory] | <code>Boolean</code> | <code>false</code> | If set true, only check whether the directory that the file saved is exist. |

<a name="AbstractConfig+loadNecessaryDirectory"></a>

### consulConfig.loadNecessaryDirectory(key, [endWithSeparator]) ⇒ <code>Promise</code> \| <code>String</code>
Get directory path by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>loadNecessaryDirectory</code>](#AbstractConfig+loadNecessaryDirectory)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [endWithSeparator] | <code>Boolean</code> | <code>false</code> | If set ture, the key must be end with `/`(Linux) or `\`(Windows). |

<a name="AbstractConfig+loadNecessaryUrl"></a>

### consulConfig.loadNecessaryUrl(key, [endWithSeparator]) ⇒ <code>Promise</code> \| <code>String</code>
Get URL by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>ConsulConfig</code>](#ConsulConfig)  
**Overrides**: [<code>loadNecessaryUrl</code>](#AbstractConfig+loadNecessaryUrl)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [endWithSeparator] | <code>Boolean</code> | <code>false</code> | If set ture, the key must be end with `/`. |

<a name="JsonConfig"></a>

## JsonConfig ⇐ [<code>AbstractConfig</code>](#AbstractConfig)
**Kind**: global class  
**Extends**: [<code>AbstractConfig</code>](#AbstractConfig)  

* [JsonConfig](#JsonConfig) ⇐ [<code>AbstractConfig</code>](#AbstractConfig)
    * [new JsonConfig(option)](#new_JsonConfig_new)
    * [.allLoaded()](#AbstractConfig+allLoaded) ⇒ <code>Promise</code>
    * [.loadVar(key)](#AbstractConfig+loadVar) ⇒ <code>String</code> \| <code>Object</code> \| <code>Promise</code>
    * [.loadNecessaryVar(key)](#AbstractConfig+loadNecessaryVar) ⇒ <code>String</code> \| <code>Object</code>
    * [.loadNecessaryString(key)](#AbstractConfig+loadNecessaryString) ⇒ <code>String</code>
    * [.loadNecessaryInt(key)](#AbstractConfig+loadNecessaryInt) ⇒ <code>Integer</code>
    * [.loadNecessaryObject(key)](#AbstractConfig+loadNecessaryObject) ⇒ <code>Promise</code> \| <code>Object</code>
    * [.loadNecessaryFile(key, [onlyCheckDirectory])](#AbstractConfig+loadNecessaryFile) ⇒ <code>Promise</code> \| <code>String</code>
    * [.loadNecessaryDirectory(key, [endWithSeparator])](#AbstractConfig+loadNecessaryDirectory) ⇒ <code>Promise</code> \| <code>String</code>
    * [.loadNecessaryUrl(key, [endWithSeparator])](#AbstractConfig+loadNecessaryUrl) ⇒ <code>Promise</code> \| <code>String</code>

<a name="new_JsonConfig_new"></a>

### new JsonConfig(option)

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> |  |
| option.configObject | <code>Object</code> | The Json object. |

<a name="AbstractConfig+allLoaded"></a>

### jsonConfig.allLoaded() ⇒ <code>Promise</code>
Check if all loading has been finished.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>allLoaded</code>](#AbstractConfig+allLoaded)  
<a name="AbstractConfig+loadVar"></a>

### jsonConfig.loadVar(key) ⇒ <code>String</code> \| <code>Object</code> \| <code>Promise</code>
Get value by key

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>loadVar</code>](#AbstractConfig+loadVar)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryVar"></a>

### jsonConfig.loadNecessaryVar(key) ⇒ <code>String</code> \| <code>Object</code>
Get value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>loadNecessaryVar</code>](#AbstractConfig+loadNecessaryVar)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryString"></a>

### jsonConfig.loadNecessaryString(key) ⇒ <code>String</code>
Get string value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>loadNecessaryString</code>](#AbstractConfig+loadNecessaryString)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryInt"></a>

### jsonConfig.loadNecessaryInt(key) ⇒ <code>Integer</code>
Get integer value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>loadNecessaryInt</code>](#AbstractConfig+loadNecessaryInt)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryObject"></a>

### jsonConfig.loadNecessaryObject(key) ⇒ <code>Promise</code> \| <code>Object</code>
Get object value by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>loadNecessaryObject</code>](#AbstractConfig+loadNecessaryObject)  

| Param | Type |
| --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) | 

<a name="AbstractConfig+loadNecessaryFile"></a>

### jsonConfig.loadNecessaryFile(key, [onlyCheckDirectory]) ⇒ <code>Promise</code> \| <code>String</code>
Get file path by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>loadNecessaryFile</code>](#AbstractConfig+loadNecessaryFile)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [onlyCheckDirectory] | <code>Boolean</code> | <code>false</code> | If set true, only check whether the directory that the file saved is exist. |

<a name="AbstractConfig+loadNecessaryDirectory"></a>

### jsonConfig.loadNecessaryDirectory(key, [endWithSeparator]) ⇒ <code>Promise</code> \| <code>String</code>
Get directory path by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>loadNecessaryDirectory</code>](#AbstractConfig+loadNecessaryDirectory)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [endWithSeparator] | <code>Boolean</code> | <code>false</code> | If set ture, the key must be end with `/`(Linux) or `\`(Windows). |

<a name="AbstractConfig+loadNecessaryUrl"></a>

### jsonConfig.loadNecessaryUrl(key, [endWithSeparator]) ⇒ <code>Promise</code> \| <code>String</code>
Get URL by key, the value must be exist, otherwise the process will exit.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  
**Overrides**: [<code>loadNecessaryUrl</code>](#AbstractConfig+loadNecessaryUrl)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| key | [<code>KeyItem</code>](#KeyItem) |  |  |
| [endWithSeparator] | <code>Boolean</code> | <code>false</code> | If set ture, the key must be end with `/`. |

<a name="KeyItem"></a>

## KeyItem : <code>String</code>
The item from configure object. It can be a format of ordinary string , such as `field`; also can be a nested string, such as `fieldParent.filedSub.fieldSubSub` in Json mode or `fieldParent/filedSub/fieldSubSub` in consul mode.

**Kind**: global typedef  
