function Left () {
    iBIT.Spin(ibitSpin.Left, Speed)
}
function Turn_Right () {
    iBIT.MotorStop()
    basic.pause(10)
    iBIT.Spin(ibitSpin.Right, Turn_Speed)
    basic.pause(100)
    Read5ADC()
    while (R2 > Ref_R2) {
        Read5ADC()
    }
    iBIT.Spin(ibitSpin.Right, Turn_Speed - 20)
    while (R1 > Ref_R1) {
        Read5ADC()
    }
    iBIT.MotorStop()
    basic.pause(10)
}
function Straight100ms () {
    Forward()
    basic.pause(200)
}
function Forward () {
    iBIT.Motor2(ibitMotor.Forward, Base_Left_Speed, Base_Right_Speed)
}
function Trac_ms () {
    let Trac_Time = 0
    Start = input.runningTime()
    Timer = 0
    while (Timer < Trac_Time) {
        Trac_PID()
        basic.pause(Kt)
        Timer = input.runningTime() - Start
        Cal_Error()
    }
}
function Trac_ms_Speed () {
    Kd += 40
    Base_Speed = ACC_Speed
    Trac_ms()
    Base_Speed = Speed
    Kd += -40
}
function Can1 () {
    basic.showIcon(IconNames.Yes)
    Robot_Start()
    for (let index = 0; index < 3; index++) {
        TracJC()
        Straight100ms()
    }
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Left()
    }
    for (let index = 0; index < 2; index++) {
        TracJC()
        Straight100ms()
    }
    TracJC()
    Turn_Left()
    TracJC()
    Straight100ms()
    TracJC()
    Turn_Left()
    TracJC()
    Turn_Right()
    GripDown2()
    TracJC_Slow_Stop()
    Grip()
    GripUp()
    UTurn_Left()
    TracJC()
    Turn_Left()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Right()
    TracJC()
    for (let index = 0; index < 3; index++) {
        Straight100ms()
        TracJC()
    }
    Turn_Left()
    TracJC()
    Turn_Left()
    GotoPut()
}
input.onButtonPressed(Button.A, function () {
    Can1()
    Can2()
    Can3()
    Can4()
    Stop()
})
function UTurn_Left () {
    iBIT.MotorStop()
    basic.pause(10)
    iBIT.Spin(ibitSpin.Left, Turn_Speed)
    basic.pause(300)
    Read5ADC()
    while (L2 > Ref_L2) {
        Read5ADC()
    }
    iBIT.Spin(ibitSpin.Left, Turn_Speed - 20)
    while (L1 > Ref_L1) {
        Read5ADC()
    }
    iBIT.MotorStop()
    basic.pause(10)
}
function TracJC_Slow_Stop () {
    Base_Speed = Slow_Speed
    TracJC_Stop()
    Base_Speed = Speed
}
function Turn_Left () {
    iBIT.MotorStop()
    basic.pause(10)
    iBIT.Spin(ibitSpin.Left, Turn_Speed)
    basic.pause(100)
    Read5ADC()
    while (L2 > Ref_L2) {
        Read5ADC()
    }
    iBIT.Spin(ibitSpin.Left, Turn_Speed - 20)
    while (L1 > Ref_L1) {
        Read5ADC()
    }
    iBIT.MotorStop()
    basic.pause(10)
}
function Can3 () {
    UTurn_Right()
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Left()
    }
    for (let index = 0; index < 2; index++) {
        TracJC()
        Straight100ms()
    }
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Left()
    GripDown2()
    TracJC_Slow_Stop()
    Grip()
    GripUp()
    UTurn_Left()
    TracJC()
    Turn_Right()
    TracJC()
    Turn_Left()
    GotoPut()
}
function Put () {
    iBIT.MotorStop()
    iBIT.Servo(ibitServo.SV1, 150)
    basic.pause(300)
}
function Can4 () {
    UTurn_Right()
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Left()
    }
    for (let index = 0; index < 3; index++) {
        TracJC()
        Straight100ms()
    }
    GripDown2()
    TracJC_Slow_Stop()
    Grip()
    GripUp()
    UTurn_Left()
    TracJC()
    Straight100ms()
    GotoPut()
}
function Show8ADC () {
    Read5ADC()
    basic.showNumber(L2)
    basic.pause(2000)
    basic.showNumber(L1)
    basic.pause(2000)
    basic.showNumber(C)
    basic.pause(2000)
    basic.showNumber(R1)
    basic.pause(2000)
    basic.showNumber(R2)
    basic.pause(2000)
    Read3ADC_Back()
    basic.showNumber(BL)
    basic.pause(2000)
    basic.showNumber(BC)
    basic.pause(2000)
    basic.showNumber(BR)
    basic.pause(2000)
}
function Trac () {
    Read5ADC()
    if (C < Ref_C) {
        Forward()
    } else if (L2 < Ref_L2) {
        iBIT.Turn(ibitTurn.Left, 60)
    } else if (L1 < Ref_L1) {
        iBIT.Turn(ibitTurn.Left, 40)
    } else if (R2 < Ref_R2) {
        iBIT.Turn(ibitTurn.Right, 60)
    } else if (R1 < Ref_R1) {
        iBIT.Turn(ibitTurn.Right, 40)
    }
}
function Grip () {
    iBIT.MotorStop()
    iBIT.Servo(ibitServo.SV1, 75)
    basic.pause(300)
}
function GripDown () {
    iBIT.MotorStop()
    iBIT.Servo(ibitServo.SV2, 100)
    basic.pause(300)
}
function TracBack () {
    Read3ADC_Back()
    if (BC < RefBC) {
        Backward()
    } else if (BL < Ref_BL) {
        iBIT.Motor2(ibitMotor.Backward, 0, Speed / 2)
    } else if (BR < Ref_BR) {
        iBIT.Motor2(ibitMotor.Backward, Speed / 2, 0)
    } else {
        Backward()
    }
}
function TracJC () {
    TracJC_Stop()
    Forward()
    Cal_Error()
    basic.pause(JC_Delay_Time)
}
function GripUp () {
    iBIT.MotorStop()
    iBIT.Servo(ibitServo.SV2, 40)
    basic.pause(300)
}
function Read5ADC () {
    L2 = iBIT.ReadADC(ibitReadADC.ADC0)
    L1 = iBIT.ReadADC(ibitReadADC.ADC1)
    C = iBIT.ReadADC(ibitReadADC.ADC2)
    R1 = iBIT.ReadADC(ibitReadADC.ADC3)
    R2 = iBIT.ReadADC(ibitReadADC.ADC4)
}
function Trac_PID () {
    Initial_Speed()
    Output = Kp * error + (Ki * Sum_error + Kd * (error - Pre_error))
    Left_Speed = Base_Left_Speed + Output
    Right_Speed = Base_Right_Speed - Output
    if (Left_Speed > 0) {
        if (Left_Speed > Max_Speed) {
            Left_Speed = Max_Speed
        }
        iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Forward, Left_Speed)
    } else {
        if (Math.abs(Left_Speed) > Max_Speed) {
            Left_Speed = Max_Speed
        }
        iBIT.setMotor(ibitMotorCH.M1, ibitMotor.Backward, Math.abs(Left_Speed))
    }
    if (Right_Speed > 0) {
        if (Right_Speed > Max_Speed) {
            Right_Speed = Max_Speed
        }
        iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Forward, Right_Speed)
    } else {
        if (Math.abs(Right_Speed) > Max_Speed) {
            Right_Speed = Max_Speed
        }
        iBIT.setMotor(ibitMotorCH.M2, ibitMotor.Backward, Math.abs(Right_Speed))
    }
    Pre_error = error
    Sum_error += error
}
input.onButtonPressed(Button.B, function () {
    Show8ADC()
})
function Robot_Start () {
    Forward()
    basic.pause(500)
}
function TracJC_Speed () {
    Base_Speed = ACC_Speed
    Kd += 40
    TracJC_Stop()
    Forward()
    Cal_Error()
    while (error >= 100) {
        Cal_Error()
    }
    basic.pause(JC_Delay_Time)
    Base_Speed = Speed
    Kd += -40
}
function Cal_Error () {
    Read5ADC()
    if (L2 > Ref_L2 && (L1 > Ref_L1 && (C > Ref_C && (R1 > Ref_R1 && R2 < Ref_R2)))) {
        error = 4
    } else {
        if (L2 > Ref_L2 && (L1 > Ref_L1 && (C > Ref_C && (R1 < Ref_R1 && R2 < Ref_R2)))) {
            error = 3
        } else {
            if (L2 > Ref_L2 && (L1 > Ref_L1 && (C > Ref_C && (R1 < Ref_R1 && R2 > Ref_R2)))) {
                error = 2
            } else {
                if (L2 > Ref_L2 && (L1 > Ref_L1 && (C < Ref_C && (R1 < Ref_R1 && R2 > Ref_R2)))) {
                    error = 1
                } else {
                    if (L2 > Ref_L2 && (L1 > Ref_L1 && (C < Ref_C && (R1 > Ref_R1 && R2 > Ref_R2)))) {
                        error = 0
                    } else {
                        if (L2 > Ref_L2 && (L1 < Ref_L1 && (C < Ref_C && (R1 > Ref_R1 && R2 > Ref_R2)))) {
                            error = -1
                        } else {
                            if (L2 > Ref_L2 && (L1 < Ref_L1 && (C > Ref_C && (R1 > Ref_R1 && R2 > Ref_R2)))) {
                                error = -2
                            } else {
                                if (L2 < Ref_L2 && (L1 < Ref_L1 && (C > Ref_C && (R1 > Ref_R1 && R2 > Ref_R2)))) {
                                    error = -3
                                } else {
                                    if (L2 < Ref_L2 && (L1 > Ref_L1 && (C > Ref_C && (R1 > Ref_R1 && R2 > Ref_R2)))) {
                                        error = -4
                                    } else {
                                        if (L2 < Ref_L2 && (L1 < Ref_L1 && (C < Ref_C && (R1 < Ref_R1 && R2 < Ref_R2)))) {
                                            error = 100
                                        } else {
                                            if (L2 < Ref_L2 && (L1 < Ref_L1 && C < Ref_C)) {
                                                error = 101
                                            } else {
                                                if (C < Ref_C && (R1 < Ref_R1 && R2 < Ref_R2)) {
                                                    error = 102
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
function GripDown2 () {
    iBIT.MotorStop()
    iBIT.Servo(ibitServo.SV2, 130)
    basic.pause(300)
}
function Right () {
    iBIT.Spin(ibitSpin.Right, Speed)
}
function Can2 () {
    UTurn_Right()
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Left()
    }
    for (let index = 0; index < 2; index++) {
        TracJC()
        Straight100ms()
    }
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Right()
    }
    for (let index = 0; index < 3; index++) {
        TracJC()
        Straight100ms()
    }
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Left()
    }
    TracJC()
    Straight100ms()
    TracJC()
    Turn_Left()
    GripDown2()
    TracJC_Slow_Stop()
    Grip()
    GripUp()
    UTurn_Left()
    TracJC()
    Turn_Right()
    TracJC()
    Straight100ms()
    TracJC()
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Right()
    }
    for (let index = 0; index < 3; index++) {
        TracJC()
        Straight100ms()
    }
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Left()
    }
    GotoPut()
}
function Read3ADC_Back () {
    BL = iBIT.ReadADC(ibitReadADC.ADC5)
    BC = iBIT.ReadADC(ibitReadADC.ADC6)
    BR = iBIT.ReadADC(ibitReadADC.ADC7)
}
function TracJC_Stop () {
    Cal_Error()
    while (error < 50) {
        Trac_PID()
        Start = input.runningTime()
        Timer = 0
        while (Timer < Kt && error != 100) {
            Timer = input.runningTime() - Start
            Cal_Error()
        }
    }
}
function TracBackJC () {
    Initial_Speed()
    Read3ADC_Back()
    while (BL > Ref_BL || BR > Ref_BR) {
        TracBack()
    }
    Backward()
    basic.pause(100)
}
function UTurn_Right () {
    iBIT.MotorStop()
    basic.pause(10)
    iBIT.Spin(ibitSpin.Right, Turn_Speed)
    basic.pause(300)
    Read5ADC()
    while (R2 > Ref_R2) {
        Read5ADC()
    }
    iBIT.Spin(ibitSpin.Right, Turn_Speed - 40)
    while (R1 > Ref_R1) {
        Read5ADC()
    }
    iBIT.MotorStop()
    basic.pause(10)
}
function Stop () {
    iBIT.MotorStop()
    basic.showString("Finish")
    basic.showIcon(IconNames.Chessboard)
    while (true) {
    	
    }
}
function Initial_Speed () {
    Base_Left_Speed = Base_Speed - 1
    Base_Right_Speed = Base_Speed - 0
    Max_Speed = Base_Speed
}
function GotoPut () {
    for (let index = 0; index < 2; index++) {
        TracJC()
        Straight100ms()
    }
    for (let index = 0; index < 2; index++) {
        TracJC()
        Turn_Right()
    }
    GripDown()
    TracJC_Stop()
    Forward()
    basic.pause(100)
    GripDown2()
    Put()
    Backward()
    basic.pause(100)
    GripUp()
}
function Backward () {
    iBIT.Motor2(ibitMotor.Backward, Base_Left_Speed, Base_Right_Speed - 4)
}
let Max_Speed = 0
let Right_Speed = 0
let Left_Speed = 0
let Pre_error = 0
let Sum_error = 0
let error = 0
let Output = 0
let BR = 0
let BC = 0
let BL = 0
let C = 0
let L1 = 0
let L2 = 0
let Timer = 0
let Start = 0
let Base_Right_Speed = 0
let Base_Left_Speed = 0
let R1 = 0
let R2 = 0
let Turn_Speed = 0
let Base_Speed = 0
let Slow_Speed = 0
let ACC_Speed = 0
let Speed = 0
let Ref_BR = 0
let RefBC = 0
let Ref_BL = 0
let Ref_R2 = 0
let Ref_R1 = 0
let Ref_C = 0
let Ref_L1 = 0
let Ref_L2 = 0
let Kt = 0
let Ki = 0
let Kd = 0
let Kp = 0
let JC_Delay_Time = 0
JC_Delay_Time = 35
Kp = 12
Kd = 26
Ki = 0
Kt = 10
Ref_L2 = 2800
Ref_L1 = 2800
Ref_C = 2800
Ref_R1 = 2800
Ref_R2 = 2800
Ref_BL = 2800
RefBC = 2800
Ref_BR = 2800
GripDown2()
Grip()
basic.showIcon(IconNames.Happy)
GripUp()
Put()
Speed = 60
ACC_Speed = Speed + 20
Slow_Speed = Speed - 10
Base_Speed = Speed
Turn_Speed = Base_Speed
Initial_Speed()
