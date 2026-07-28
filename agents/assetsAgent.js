/*

Family Wealth AI OS

V6.1 Stable Compatible Build

Assets Agent

资产管理兼容版

兼容 V5.4 数据结构

*/

const assetsAgent = {

    name:

    "Assets Agent V6.1 Stable",

    // ======================

    // 初始化

    // ======================

    init(){

        let oldData =

        localStorage.getItem(

            "assets"

        );

        let newData =

        localStorage.getItem(

            "wealth_assets"

        );

        // 优先迁移旧稳定版本数据

        if(

            oldData

        ){

            localStorage.setItem(

                "wealth_assets",

                oldData

            );

        }

        else if(

            !newData

        ){

            localStorage.setItem(

                "wealth_assets",

                JSON.stringify([])

            );

        }

        return "Assets Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        let data =

        localStorage.getItem(

            "wealth_assets"

        );

        // 兼容 V5.4

        if(!data){

            data =

            localStorage.getItem(

                "assets"

            );

        }

        return JSON.parse(

            data || "[]"

        );

    },

    // ======================

    // 保存

    // ======================

    save(data){

        localStorage.setItem(

            "wealth_assets",

            JSON.stringify(data)

        );

        // 同步旧格式

        localStorage.setItem(

            "assets",

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加资产

    // ======================

    add(asset){

        let list =

        this.getData();

        let item={

            id:

            Date.now(),

            name:

            asset.name || "",

            category:

            asset.category || "其他",

            type:

            asset.type || "",

            owner:

            asset.owner || "",

            country:

            asset.country || "",

            currency:

            asset.currency || "CNY",

            institution:

            asset.institution || "",

            account:

            asset.account || "",

            value:

            Number(

                asset.value || 0

            ),

            note:

            asset.note || ""

        };

        list.push(item);

        this.save(list);

        return item;

    },

    // ======================

    // 查看

    // ======================

    view(){

        return this.getData();

    },

    // ======================

    // 编辑

    // ======================

    edit(id,newData){

        let list =

        this.getData();

        let index =

        list.findIndex(

            item =>

            item.id === id

        );

        if(index !== -1){

            list[index]={

                ...list[index],

                ...newData

            };

        }

        this.save(list);

        return list;

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        let list =

        this.getData();

        list =

        list.filter(

            item =>

            item.id !== id

        );

        this.save(list);

        return "deleted";

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalValue = 0;

        list.forEach(item=>{

            totalValue +=

            Number(

                item.value || 0

            );

        });

        return {

            count:

            list.length,

            totalValue

        };

    },

    // ======================

    // 配置分析接口

    // ======================

    allocationSummary(){

        let result={};

        this.getData()

        .forEach(item=>{

            let key =

            item.category || "其他";

            if(!result[key]){

                result[key]=0;

            }

            result[key]+=

            Number(

                item.value || 0

            );

        });

        return result;

    }

};

export default assetsAgent;
