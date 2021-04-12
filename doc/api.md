## Classes

<dl>
<dt><a href="#ConsulConfigSync">ConsulConfigSync</a> ⇐ <code><a href="#JsonConfig">JsonConfig</a></code></dt>
<dd></dd>
<dt><a href="#JsonConfig">JsonConfig</a></dt>
<dd></dd>
<dt><a href="#Parser">Parser</a></dt>
<dd><p>The class of Validator</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#CustomParseFunction">CustomParseFunction(option)</a> ⇒ <code><a href="#ElementParsedResult">ElementParsedResult</a></code></dt>
<dd></dd>
<dt><a href="#AfterParseFunction">AfterParseFunction(key, newValue, isFromWatch)</a></dt>
<dd></dd>
<dt><a href="#WatchFunction">WatchFunction(error, key, newValue)</a></dt>
<dd></dd>
<dt><a href="#getConfigFromConsulSync">getConfigFromConsulSync(option)</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#ConsulOption">ConsulOption</a></dt>
<dd></dd>
<dt><a href="#SchemaElement">SchemaElement</a></dt>
<dd></dd>
<dt><a href="#Schema">Schema</a></dt>
<dd></dd>
<dt><a href="#ElementParsedResult">ElementParsedResult</a></dt>
<dd></dd>
</dl>

<a name="ConsulConfigSync"></a>

## ConsulConfigSync ⇐ [<code>JsonConfig</code>](#JsonConfig)
**Kind**: global class  
**Extends**: [<code>JsonConfig</code>](#JsonConfig)  

* [ConsulConfigSync](#ConsulConfigSync) ⇐ [<code>JsonConfig</code>](#JsonConfig)
    * [new ConsulConfigSync(option)](#new_ConsulConfigSync_new)
    * [.params](#JsonConfig+params)
    * [.getValue(key)](#JsonConfig+getValue) ⇒ <code>\*</code>

<a name="new_ConsulConfigSync_new"></a>

### new ConsulConfigSync(option)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| option | <code>Object</code> |  |  |
| option.consulAddr | <code>String</code> |  | The consul address, in the format of `ip:port`. |
| option.pathPrefix | <code>String</code> |  | The prefix of consul key element. |
| option.schema | [<code>Schema</code>](#Schema) |  | The schema object. |
| [option.waitTimeBeforeThrowErrorMs] | <code>Number</code> | <code>0</code> | The wait time before trigger error when the value returned is not expected.  The default value is `0`, but it will throw the error in async way even if you set the parameter to `0`. |
| [option.timeout4RequestConsulMs] | <code>Number</code> | <code>5000</code> | The timeout milliseconds for consul request. |
| [option.retryLimit] | <code>Number</code> | <code>0</code> | The retry times before getting data from consul failed.  The default is `0`, which means no limit. |
| [option.consulOption] | [<code>ConsulOption</code>](#ConsulOption) | <code>{}</code> | The consul option used to init a consul client. |

<a name="JsonConfig+params"></a>

### consulConfigSync.params
Get All the value.

**Kind**: instance property of [<code>ConsulConfigSync</code>](#ConsulConfigSync)  
**Overrides**: [<code>params</code>](#JsonConfig+params)  
<a name="JsonConfig+getValue"></a>

### consulConfigSync.getValue(key) ⇒ <code>\*</code>
Get the value via key name.

**Kind**: instance method of [<code>ConsulConfigSync</code>](#ConsulConfigSync)  
**Overrides**: [<code>getValue</code>](#JsonConfig+getValue)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="JsonConfig"></a>

## JsonConfig
**Kind**: global class  

* [JsonConfig](#JsonConfig)
    * [new JsonConfig(option)](#new_JsonConfig_new)
    * [.params](#JsonConfig+params)
    * [.getValue(key)](#JsonConfig+getValue) ⇒ <code>\*</code>

<a name="new_JsonConfig_new"></a>

### new JsonConfig(option)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| option | <code>Object</code> |  |  |
| option.configObject | <code>Object</code> |  | The Json object. |
| option.schema | [<code>Schema</code>](#Schema) |  | The schema object. |
| [option.waitTimeBeforeThrowErrorMs] | <code>Number</code> | <code>0</code> | The wait time before trigger error when the value returned is not expected.  The default value is `0`, but it will throw the error in async way even if you set the parameter to `0`. |

<a name="JsonConfig+params"></a>

### jsonConfig.params
Get All the value.

**Kind**: instance property of [<code>JsonConfig</code>](#JsonConfig)  
<a name="JsonConfig+getValue"></a>

### jsonConfig.getValue(key) ⇒ <code>\*</code>
Get the value via key name.

**Kind**: instance method of [<code>JsonConfig</code>](#JsonConfig)  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 

<a name="Parser"></a>

## Parser
The class of Validator

**Kind**: global class  

* [Parser](#Parser)
    * [new Parser(schema)](#new_Parser_new)
    * [.doParseElement(option)](#Parser+doParseElement) ⇒ [<code>ElementParsedResult</code>](#ElementParsedResult)
    * [.doParse(params)](#Parser+doParse) ⇒ <code>Object</code>

<a name="new_Parser_new"></a>

### new Parser(schema)
Creates an instance of Validator.


| Param | Type |
| --- | --- |
| schema | [<code>Schema</code>](#Schema) | 

<a name="Parser+doParseElement"></a>

### parser.doParseElement(option) ⇒ [<code>ElementParsedResult</code>](#ElementParsedResult)
Parse one config.

**Kind**: instance method of [<code>Parser</code>](#Parser)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| option | <code>Object</code> |  |  |
| option.key | <code>String</code> |  |  |
| option.value | <code>\*</code> |  |  |
| [option.isFromWatch] | <code>Boolean</code> | <code>false</code> |  |
| [option.oldValue] | <code>\*</code> |  | pass to when isFromWatch is true |

<a name="Parser+doParse"></a>

### parser.doParse(params) ⇒ <code>Object</code>
Parse all the config.

**Kind**: instance method of [<code>Parser</code>](#Parser)  

| Param | Type |
| --- | --- |
| params | <code>Object</code> | 

<a name="CustomParseFunction"></a>

## CustomParseFunction(option) ⇒ [<code>ElementParsedResult</code>](#ElementParsedResult)
**Kind**: global function  
**Returns**: [<code>ElementParsedResult</code>](#ElementParsedResult) - the validate result.  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> |  |
| option.key | <code>String</code> | the key |
| option.value | <code>\*</code> | the value you want to validated |
| option.schemaElement | [<code>SchemaElement</code>](#SchemaElement) | the element of schema. |

<a name="AfterParseFunction"></a>

## AfterParseFunction(key, newValue, isFromWatch)
**Kind**: global function  

| Param | Type |
| --- | --- |
| key | <code>String</code> | 
| newValue | <code>\*</code> | 
| isFromWatch | <code>Boolean</code> | 

<a name="WatchFunction"></a>

## WatchFunction(error, key, newValue)
**Kind**: global function  

| Param | Type |
| --- | --- |
| error | <code>Error</code> \| <code>String</code> | 
| key | <code>String</code> | 
| newValue | <code>\*</code> | 

<a name="getConfigFromConsulSync"></a>

## getConfigFromConsulSync(option)
**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| option | <code>Object</code> |  |  |
| option.consulAddr | <code>String</code> |  | The consul address, in the format of `ip:port`. |
| option.pathPrefix | <code>String</code> |  | The prefix of consul key element. |
| option.savePath | <code>String</code> |  | The full path name of the generated config file. |
| option.keys | <code>Array.&lt;String&gt;</code> |  | The consul keys' name. |
| [option.timeoutMs] | <code>Number</code> | <code>5000</code> | The timeout milliseconds for consul request. |
| [option.retryLimit] | <code>Number</code> | <code>0</code> | The retry times before getting data from consul failed. The default is `0`, which means no limit. |

<a name="ConsulOption"></a>

## ConsulOption
**Kind**: global typedef  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [secure] | <code>Boolean</code> | <code>false</code> | enable HTTPS |
| [ca] | <code>Array.&lt;String&gt;</code> |  | array of strings or Buffers of trusted certificates in PEM format |
| [defaults] | <code>Object</code> |  | common method call options that will be included with every call  (ex: set default token) |

<a name="SchemaElement"></a>

## SchemaElement
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [required] | <code>Boolean</code> \| <code>Array</code> | <code>false</code> | indicate whether the current field necessary |
| type | <code>Number</code> \| <code>JSON</code> \| <code>Date</code> \| <code>String</code> \| <code>Object</code> |  | declare the current field's type,  it can be `Number` `JSON` `String` `Parser.TYPE_FILE` `Parser.TYPE_DIRECTORY` `Parser.TYPE_URL` or an Object with properties. see |
| [custom] | [<code>CustomParseFunction</code>](#CustomParseFunction) |  | the custom validate function |
| [options] | <code>Object</code> |  | the extended options used to check validate. |
| [afterParse] | [<code>AfterParseFunction</code>](#AfterParseFunction) |  | the function to do after parse. |
| [watch] | [<code>WatchFunction</code>](#WatchFunction) |  | the function used in consul watch callback |
| [isWatchDisabled] | <code>Boolean</code> | <code>false</code> | whether disable watching the key's changes, default is false. |

<a name="Schema"></a>

## Schema
**Kind**: global typedef  
**Properties**

| Name | Type |
| --- | --- |
| filedName | [<code>SchemaElement</code>](#SchemaElement) | 

**Example**  
```javascript{  numberFiled : {    required:true,    type : Number,    options: {     gte: 10,     lte: 1    },    afterParse: function(value) {}  }}```
**Example**  
```javascript{ dateField:{     required:[true,'the dateField can not be empty']     type:[Date,'the dataField must be a Date'] }}```
**Example**  
```javascript{  objectField: {     type: {         field1: {type: [Number, 'field must be a Number']},         field2: {type: String, required: true}     } }}```
<a name="ElementParsedResult"></a>

## ElementParsedResult
**Kind**: global typedef  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [error] | <code>String</code> \| <code>Error</code> | <code></code> | when the value is invalid, the error is not empty. |
| value | <code>\*</code> |  | when the value is valid, return the value , it may be transfromed to the type you want. |
| changed | <code>Boolean</code> |  | whether the value is changed, it may be true when the key changed from consul. |

