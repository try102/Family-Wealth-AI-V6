/*

Family Wealth AI OS

V6.0 Development Build001

Income Agent

家庭收入管理核心模块

*/

const incomeAgent = {

    name:

    "Income Agent V6.0",

    // ======================

    // 初始化

    // ======================

    init(){

        if(

            !localStorage.getItem(

                "wealth_income"

            )

        ){

            localStorage.setItem(

                "wealth_income",

                JSON.stringify([])

            );

        }

        return "Income Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return JSON.parse(

            localStorage.getItem(

                "wealth_income"

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

            "wealth_income",

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加收入

    // ======================

    add(income){

        let list =

        this.getData();

        let item={

            id:

            Date.now(),

            name:

            income.name || "",

            category:

            income.category || "其他",

            source:

            income.source || "",

            amount:

            Number(

                income.amount || 0

            ),

            period:

            income.period || "年度",

            note:

            income.note || ""

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

    // 汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalIncome=0;

        list.forEach(item=>{

            totalIncome +=

            Number(

                item.amount || 0

            );

        });

        return {

            count:

            list.length,

            totalIncome

        };

    }

};

export default incomeAgent;
