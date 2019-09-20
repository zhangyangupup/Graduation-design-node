 /**
     * @param  {} id
     * @param  {} name
     * @param  {} age
     * @param  {} passWord
     * @param  {} defaultAddress
     * @param  {} province
     * @param  {} city
     * @param  {} detailddress
     * @param  {} phoneNumber
     */
var UserSQL = {
    // add new userinfo
    insert: 'INSERT INTO person(id,name,age,passWord,defaultAddress,province,city,detailddress,phoneNumber) VALUES(?,?,?,?,?,?,?,?,?)',
    // search all info from person table
    queryAll: 'SELECT * FROM person',
    // search info from table by id
    queryById: 'select * from person where id=?;',
    // 通过id查询用户
    getUserById: 'SELECT * FROM person WHERE id = ? ',
    // get all users
    getUser: 'SELECT * FROM person',
    //  管理端登录
    adminLogin :'select * from admin where adminUser = ? and password = ?',
    addAdmin:'insert into admin(adminUser, password) values(?,?)',
    // login by id and password
    login: 'select * from person where id=? and passWord=?',
    // change info by id
    changePwd: 'UPDATE person SET passWord = ? WHERE id = ?',
    // search classification
    classification: 'select * from classification where class= ?',
    // classes by id
    classificationById: 'select * from classification where id= ?',
    // add classification
    insertclass: 'INSERT INTO classification(class, id, label, isShow, smallClass) VALUES(?,?,?,?,?)',
    // delete classification
    deleteclass: 'DELETE FROM classification WHERE id = ?',
    // get all products
    getAllProducts: 'SELECT * FROM product',
    // get product info by name
    getProductName:'select * from product where proTitle like ?',
    // get product info by id
    getProductId:'select * from product where id like ?',
    getProductStoreId:'select * from product where StoreId like ?',
    getProductStoreName:'select * from product where StoreName like ?',
    getProductPrice:'select * from product where price like ?',

    // get product info by class
    getProductClass:'select * from product where class = ?',
    // get product info by like
    getProductLike:"select * from product where proTitle LIKE ?",
    // get product info by class
    getProductRecommed:'select * from product where isRecommed = ?',
    // delete product by id
    deleteProductId:'DELETE FROM product WHERE id = ?',
    // update product info by id
    updateProduct:'UPDATE product SET ProductName = ?, Price = ?, StoreName = ?,  StoreId = ? WHERE id = ?',
    // addProduct
    addProduct: 'insert into `product`(proTitle,price,StoreName,ImgSrc1,ImgSrc2,ImgSrc3,id,StoreId,Class,imgSrc,isSelf,selfTitle,isActive,activeTitle,isSame,sameTitle,isRecommed) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
     // app config
    getBannerImgs:'select * from banner',
    // update banner img
    updateBannerImg:'update banner set src = ?, info = ? where imgId = ?',
    // admin login
    adminLogin:'select * from admin where adminUser=? and password=?',
    // get shopcar
    getShopCar:'select * from shopCar where userId=? ',
    // add shopcar
    addShopCar:'insert into shopCar(userId,productId,imgSrc,proTitle,classKind,price,isSelected,count) values(?,?,?,?,?,?,?,?)',
    //  delete shopcar
    deleteShopCar:'DELETE FROM `shopCar` WHERE productId = ? and userId = ? ',
    // update shopcar count
    UpdateShopCarCount:'UPDATE `shopCar` SET `count` = ? WHERE `userId` = ? AND `productId` = ?',
    // add order
    addOrder:'INSERT INTO `order`(`orderId`, `personId`, `date`, `phoneNum`, `address`, `count`, `allPrice`, `proId`, `logisticsCost`, `status`, `imgSrc`, `proTitle`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    // search orders
    searchOrders:'select * from `order` where `personId`=? ',
    // 区分订单查询
    searchOrdersStatus:'select * from `order` where `personId`=? and `status`= ? ',
    // all orders
    searchAllOrders:'select * from `order`',
    // delete order
    deleteOrder:'DELETE FROM `order` WHERE `orderId` = ? AND `personId` = ? ',
    // 跟新订单状态
    updateOrder:'UPDATE `order` SET `status` = ? WHERE `orderId` = ? AND `personId` = ?'
};
module.exports = UserSQL;
