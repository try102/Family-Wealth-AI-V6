/*

Family Wealth AI OS

V6.0 Recovery Build002

Assets Agent

V6 独立数据存储版

*/

const STORAGE_KEY = "wealth_assets_v6";

const assetsAgent = {

    name:

    "Assets Agent V6.0 Isolated",

    // ======================

    // 初始化

    // ======================

    init(){

        let data =

        localStorage.getItem(

            STORAGE_KEY

        );

        if(!data){

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify([])

            );

        }

        return "Assets V6 Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        let data =

        localStorage.getItem(

            STORAGE_KEY

        );

        return JSON.parse(

            data || "[]"

        );

    },

    // ======================

    // 保存数据

    // ======================

    save(data){

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加资产

    // ======================

    add(asset){

        let list =

        this.getData();

        let item = {

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

            list[index] = {

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

    // 资产配置分析

    // ======================

    allocationSummary(){

        let result = {};

        this.getData()

        .forEach(item=>{

            let key =

            item.category || "其他";

            if(!result[key]){

                result[key]=0;

            }

            result[key] +=

            Number(

                item.value || 0

            );

        });

        return result;

    }

};

export default assetsAgent;
