

class Dot_Node{
    constructor(){
        this.childs=[null,null,null,null]
        this.count=0
        this.center=null
        this.discription=[]
        
        this.leaf=false
    }
    Update_Center(ct){
        this.center=[ct[0],ct[1]]
    }
}

function Cp(v){
    return [v[0],v[1]]
}



class Dot_Tree{
    constructor(l_b,r_t) {
        this.lib=null
        this.l_b=Cp(l_b)
        this.r_t=Cp(r_t)
    }
    Devide_Four(left_bottom,right_top,ind){
        let x_offset=ind%2
        let y_offset=Math.floor(ind/2)

        let diff=[(-left_bottom[0]+right_top[0])/2,(-left_bottom[1]+right_top[1])/2]

        let rtprime=[(left_bottom[0]+right_top[0])/2+diff[0]*x_offset,(left_bottom[1]+right_top[1])/2+diff[1]*y_offset]


        return [[left_bottom[0]+diff[0]*x_offset,left_bottom[1]+diff[1]*y_offset],rtprime]
    }

    Splite(left_bottom,right_top,pos){
        let center=[(left_bottom[0]+right_top[0])/2,(left_bottom[1]+right_top[1])/2]
        let ind=0
        if(pos[0]>center[0]){
            ind+=1
        }
        if(pos[1]>center[1]){
            ind+=2
        }
        return ind
    }

    ReCenter(node,value){
        node.center[0]=(node.center[0]*node.count+value[0]*value[2])/(node.count+value[2])
        node.center[1]=(node.center[1]*node.count+value[1]*value[2])/(node.count+value[2])
    }


    Register(value){
        let pos=[value[0],value[1]]
        if(this.lib==null){
            this.lib=new Dot_Node()
            this.lib.count=value[2]
            this.lib.Update_Center(pos)
            this.lib.leaf=true

            this.lib.discription.push(value[3])

            return
        }

        let crr=this.lib
        let prv=this.lib

        let lb=Cp(this.l_b)
        let rt=Cp(this.r_t)

        let heading=0
        while(crr!=null&&!crr.leaf){
            heading=this.Splite(lb,rt,pos)
            this.ReCenter(crr,value)
            crr.discription.push(value[3])

            let range=this.Devide_Four(lb,rt,heading)

            lb=range[0]
            rt=range[1]
            
            prv=crr
            crr=crr.childs[heading]
        }
        if(crr==null){
            let new_node=new Dot_Node()
            new_node.Update_Center(pos)
            new_node.count=value[2]
            new_node.leaf=true

            new_node.discription.push(value[3])

            prv.childs[heading]=new_node
            return
        }

        let orig_pos=Cp(crr.center)
        let orig_count=crr.count
        let orig_dis=crr.discription[0]

        this.ReCenter(crr,value)
        let blend_center=Cp(crr.center)
        let blend_count=orig_count+value[2]

        crr.discription.push(value[3])

        crr.leaf=false
        while(this.Splite(lb,rt,pos)==this.Splite(lb,rt,orig_pos)){
            heading=this.Splite(lb,rt,pos)
            let new_node=new Dot_Node()
            new_node.Update_Center(blend_center)
            new_node.count=blend_count
            new_node.leaf=false

            new_node.discription.push(orig_dis)
            new_node.discription.push(value[3])

            let range=this.Devide_Four(lb,rt,heading)

            lb=range[0]
            rt=range[1]

            crr.childs[heading]=new_node

            crr=crr.childs[heading]
        }

        let new_node=new Dot_Node()
        new_node.Update_Center(orig_pos)
        new_node.count=orig_count
        new_node.leaf=true        

        new_node.discription.push(orig_dis)

        crr.childs[this.Splite(lb,rt,orig_pos)]=new_node

        new_node=new Dot_Node()
        new_node.Update_Center(pos)
        new_node.count=value[2]
        new_node.leaf=true        

        new_node.discription.push(value[3])

        crr.childs[this.Splite(lb,rt,pos)]=new_node
    }

    Report(depth=2,target=this.lib){
        let rlt=[]

        if(depth>0&&!target.leaf){
            for(let c of target.childs){
                if(c!=null){
                    let c_rlt=this.Report(depth-1,c)
                    rlt=rlt.concat(c_rlt)
                }
            }
        }else{
            let des=[]
            for(let d of target.discription){
                if(des.length<7){
                    des.push(d)
                }else{
                    break
                }
            }
            rlt.push([target.center[0],target.center[1],target.count,des.join(";")])
        }

        return rlt;
    }


}


export default Dot_Tree


// console.log("test")

// let c=new Dot_Tree([-100,-100],[100,100])

// let test_set=[]
// for(let i=0;i<100;i++){
//     c.Register([i,i+1,i,`index: ${i}`])
// }
// // c.Register([0,0,1,"aa"])
// // c.Register([0,1,1,"aa"])


// console.log(c.Report(4))


// setTimeout(()=>{},100000)