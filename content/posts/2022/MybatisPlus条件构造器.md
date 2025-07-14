---
title: MybatisPlus条件构造器
date: 2022-06-01
categories: ["教程"]
tags: ["MybatisPlus"]
---

> 本文转自：https://blog.csdn.net/bird_tp/article/details/105587582<br>
> 看本博客有不清晰的地方，可以查看 mybatis plus 的官方文档：https://baomidou.com/

## 一、queryWrapper 是什么

queryWrapper 是 mybatis plus 中实现查询的对象封装操作类，他的层级关系如下

![](https://minio.qiang.uk/blog/20250714/1944699151924637698.png)

在上面的图片中<br>
**Wrapper** ：条件构造抽象类，最顶端父类，抽象类中提供 4 个方法西面贴源码展示<br>
**AbstractWrapper** ： 用于查询条件封装，生成`sql`的`where`条件<br>
**AbstractLambdaWrapper** ： `Lambda`语法使用`Wrapper`统一处理解析 lambda 获取 column。<br>
**LambdaQueryWrapper** ：看名称也能明白就是用于`Lambda`语法使用的查询 Wrapper<br>
**LambdaUpdateWrapper** ：`Lambda`更新封装`Wrapper`<br>
**QueryWrapper** ：`Entity`对象封装操作类，不是用`Lambda`语法<br>
**UpdateWrapper** ：`Update`条件封装，用于`Entity`对象更新操作<br>

## 二、使用 demo

```java
QueryWrapper<PbListBlack> sectionQueryWrapper = new QueryWrapper<>();
sectionQueryWrapper.eq("OPTYPE", 1);
sectionQueryWrapper.eq("BLTYPE", 1);
List<PbListBlack> pbListBlacks = iPbListBlackMapper.selectList(sectionQueryWrapper);
```

上面这段代码的意思就是，首先新建一个 QueryWrapper 对象，类型为 PbListBlack 对象，也就是你需要查询的实体数据

```java
sectionQueryWrapper.eq("OPTYPE", 1);
sectionQueryWrapper.eq("BLTYPE", 1);
```

这两句的意思是 PbListBlack 对象对应的数据库表中的 OPTYPE，BLTYPE 字段值要为 1，然后调用 iPbListBlackMapper.selectList 方法，入参就为前面新建好的查询对象封装类

**下面贴上查询实体的代码**

```java
@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
@TableName("PB_LIST_BLACK")
@ApiModel(value = "PB_LIST_BLACK对象", description = "")
public class PbListBlack extends Model<PbListBlack> {

    @TableField("ID")
    private Long id;

    @TableField("USERID")
    private String userId;

    @TableField("SPGATE")
    private String spgate;

    @TableField("SPNUMBER")
    private String spnumber;

    @TableField("PHONE")
    private Long phone;

    @TableField("OPTYPE")
    private Integer optype;

    @TableField("OPTTIME")
    private Timestamp optTime;

    @TableField("CORPCODE")
    private String corpCode;

    @TableField("SVRTYPE")
    private String svrType;

    @TableField("MSG")
    private String msg = " ";

    @ApiModelProperty(value = "黑名单类型。1：短信；2：彩信")
    @TableField("BLTYPE")
    private Integer blType;

}
```

**下面是 iPbListBlackMapper 的代码**

```java
@Repository
public interface IPbListBlackMapper extends BaseMapper<PbListBlack> {
}
```

仅仅只需要基层`BaseMapper`接口即可，这样 mybatis plus 底层封装的方法即可实现帮你查询你设置查询条件查询到的数据<br>
当你的`Mapper`继承`BaseMapper`接口后，无需编写`mapper.xml`文件，即可获得 CRUD 功能

## 三、QueryWrapper 的方法

![](https://minio.qiang.uk/blog/20250714/1944698704077828097.png)

## 四、总结

上面的博客内容虽然简单，也只展示了一个查询的功能。在你实际使用的时候，可以按照
条件构造器上面包含的的方法，设置你查询数据的条件，调用 BaseMapper 里相应的方法即可
