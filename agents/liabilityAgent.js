/*

Family Wealth AI OS

V6.2 Stable

Liability Agent

家庭负债管理核心模块

*/

const liabilityAgent = {

    name:

    "Liability Agent V6.2 Stable",

    // ======================

    // 初始化

    // ======================

    init(){

        if(

            !localStorage.getItem(

                "wealth_liabilities"

            )

        ){

            localStorage.setItem(

                "wealth_liabilities",

                JSON.stringify([])

            );

        }

        return "Liability Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return JSON.parse(

            localStorage.getItem(

                "wealth_liabilities"

            )

            ||

            "[]"

        );

    },

    // ======================

    // 保存

    // ======================

    save(data){

        localStorage.setItem(

            "wealth_liabilities",

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加负债

    // ======================

    add(data){

        let list =

        this.getData();

        let item={

            id:

            Date.now(),

            name:

            data.name || "",

            category:

            data.category || "其他",

            principal:

            Number(

                data.principal || 0

            ),

            // 6 = 6%

            interest:

            Number(

                data.interest || 0

            ),

            period:

            data.period || "",

            owner:

            data.owner || "",

            currency:

            data.currency || "CNY",

            note:

            data.note || ""

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

            item=>

            item.id===id

        );

        if(index!==-1){

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

            item=>

            item.id!==id

        );

        this.save(list);

        return "deleted";

    },

    // ======================

    // 单项分析

    // ======================

    analyze(item){

        let principal =

        Number(

            item.principal || 0

        );

        let interest =

        Number(

            item.interest || 0

        );

        return {

            ...item,

            annualInterest:

            principal *

            interest /

            100

        };

    },

    // ======================

    // 汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalLiability = 0;

        let annualInterest = 0;

        list.forEach(item=>{

            let result =

            this.analyze(item);

            totalLiability +=

            Number(

                result.principal || 0

            );

            annualInterest +=

            Number(

                result.annualInterest || 0

            );

        });

        return {

            count:

            list.length,

            totalLiability,

            annualInterest

        };

    }

};

export default liabilityAgent;
