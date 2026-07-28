/*

Family Wealth AI OS

V6.0 Development Build001

Investment Agent

家庭投资管理核心模块

*/

const investmentAgent = {

    name:

    "Investment Agent V6.0",

    // ======================

    // 初始化

    // ======================

    init(){

        if(

            !localStorage.getItem(

                "wealth_investments"

            )

        ){

            localStorage.setItem(

                "wealth_investments",

                JSON.stringify([])

            );

        }

        return "Investment Ready";

    },

    // ======================

    // 获取数据

    // ======================

    getData(){

        return JSON.parse(

            localStorage.getItem(

                "wealth_investments"

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

            "wealth_investments",

            JSON.stringify(data)

        );

    },

    // ======================

    // 添加投资

    // ======================

    add(investment){

        let list =

        this.getData();

        let item={

            id:

            Date.now(),

            name:

            investment.name || "",

            ticker:

            investment.ticker || "",

            type:

            investment.type || "股票",

            market:

            investment.market || "",

            currency:

            investment.currency || "USD",

            buyPrice:

            Number(

                investment.buyPrice || 0

            ),

            buyQuantity:

            Number(

                investment.buyQuantity || 0

            ),

            currentPrice:

            Number(

                investment.currentPrice || 0

            ),

            buyDate:

            investment.buyDate || "",

            note:

            investment.note || ""

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

    // 单项市值

    // ======================

    marketValue(item){

        return (

            Number(

                item.currentPrice || 0

            )

            *

            Number(

                item.buyQuantity || 0

            )

        );

    },

    // ======================

    // 单项收益

    // ======================

    profit(item){

        return (

            (

                Number(

                    item.currentPrice || 0

                )

                -

                Number(

                    item.buyPrice || 0

                )

            )

            *

            Number(

                item.buyQuantity || 0

            )

        );

    },

    // ======================

    // 投资汇总

    // ======================

    summary(){

        let list =

        this.getData();

        let totalValue=0;

        let totalCost=0;

        let profit=0;

        list.forEach(item=>{

            totalValue +=

            this.marketValue(item);

            totalCost +=

            Number(

                item.buyPrice || 0

            )

            *

            Number(

                item.buyQuantity || 0

            );

            profit +=

            this.profit(item);

        });

        return {

            count:

            list.length,

            totalValue,

            totalCost,

            profit,

            returnRate:

            totalCost>0

            ?

            (

                profit

                /

                totalCost

                *

                100

            ).toFixed(2)

            :

            0

        };

    },

    // ======================

    // 持仓列表

    // ======================

    inventory(){

        return this.getData()

        .map(item=>{

            return {

                ...item,

                marketValue:

                this.marketValue(item),

                totalProfit:

                this.profit(item)

            };

        });

    }

};

export default investmentAgent;
