/**
 * Created by hanyeah on 2019/8/23.
 */
namespace hanyeah.electricity.consts{
  export enum EdgeType{
    C,    // 电容性支路
    L,    // 电感性支路
    VCVS, // 电压控制电压源
    VCCS, // 电压控制电流源
    CCVS, // 电流控制电压源
    CCCS, // 电流控制电流源
    M,    // 互感
    N,    // 理想变压器
    U,    // 独立电压源
    I,    // 独立电流源
  }
}
