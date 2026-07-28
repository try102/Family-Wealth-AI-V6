/*

Family Wealth AI OS

V6.0 Development Build001

Assets Agent

资产管理核心模块

*/

const assetsAgent = {

    name:

    "Assets Agent V6.0",

    // ======================

    // 初始化

    // ======================

    init(){

        if(

            !localStorage.getItem(

                "wealth_assets"

            )

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

        return JSON.parse(

            localStorage.getItem(

                "wealth_assets"

            )

            ||

            "[]"

        );

    },

    // ======================

    // 保存数据

    // ======================

    save(data){

        localStorage.setItem(

            "wealth_assets",

            JSON.stringify(data)

        );

    },

    // ======================

    // 新增资产

    // ======================

    add(asset){

        let assets =

        this.getData();

        let item={

            id:

            Date.now(),

            name:

            asset.name || "",

            category:

            asset.category || "其他",

            value:

            Number(

                asset.value || 0

            ),

            owner:

            asset.owner || "",

            country:

            asset.country || "",

            currency:

            asset.currency || "CNY",

            note:

            asset.note || ""

        };

        assets.push(item);

        this.save(assets);

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

        let assets =

        this.getData();

        let index =

        assets.findIndex(

            item=>

            item.id===id

        );

        if(index!==-1){

            assets[index]={

                ...assets[index],

                ...newData

            };

        }

        this.save(assets);

        return assets;

    },

    // ======================

    // 删除

    // ======================

    delete(id){

        let assets =

        this.getData();

        assets =

        assets.filter(

            item=>

            item.id!==id

        );

        this.save(assets);

        return "deleted";

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let assets =

        this.getData();

        let totalValue=0;

        assets.forEach(item=>{

            totalValue +=

            Number(

                item.value || 0

            );

        });

        return {

            count:

            assets.length,

            totalValue

        };

    }

};

export default assetsAgent;
