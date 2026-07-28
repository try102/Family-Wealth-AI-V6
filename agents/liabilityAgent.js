/*

Family Wealth AI OS

V6.0 Development Build001

Liability Agent

家庭负债管理核心模块

*/

const liabilityAgent = {

    name:

    "Liability Agent V6.0",

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

    // 保存数据

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

    add(liability){

        let list =

        this.getData();

        let item={

            id:

            Date.now(),

            name:

            liability.name || "",

            category:

            liability.category || "其他",

            principal:

            Number(

                liability.principal || 0

            ),

            interest:

            Number(

                liability.interest || 0

            ),

            monthlyPayment:

            Number(

                liability.monthlyPayment || 0

            ),

            startDate:

            liability.startDate || "",

            endDate:

            liability.endDate || "",

            note:

            liability.note || ""

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

        let totalLiability=0;

        list.forEach(item=>{

            totalLiability +=

            Number(

                item.principal || 0

            );

        });

        return {

            count:

            list.length,

            totalLiability

        };

    }

};

export default liabilityAgent;
