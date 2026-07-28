/*

Family Wealth AI OS

V6.1 Stable Compatible Build

Income Agent

收入管理兼容版

*/

const incomeAgent = {

    name:

    "Income Agent V6.1 Stable",

    // ======================

    // 初始化

    // ======================

    init(){

        let oldData =

        localStorage.getItem(

            "wealth_incomes"

        );

        let newData =

        localStorage.getItem(

            "wealth_income"

        );

        // 优先恢复 V5.4 数据

        if(oldData){

            localStorage.setItem(

                "wealth_income",

                oldData

            );

        }

        else if(newData){

            localStorage.setItem(

                "wealth_incomes",

                newData

            );

        }

        else{

            localStorage.setItem(

                "wealth_incomes",

                JSON.stringify([])

            );

        }

        return "Income Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        let data =

        localStorage.getItem(

            "wealth_incomes"

        );

        if(!data){

            data =

            localStorage.getItem(

                "wealth_income"

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

            "wealth_incomes",

            JSON.stringify(data)

        );

        // 兼容 V6.0

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
