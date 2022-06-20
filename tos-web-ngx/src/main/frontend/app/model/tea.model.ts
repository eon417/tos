
export class TeaModel
{
    constructor(
        public teaID: number,

        public teaName: string,

        public teaDesc: string,

        public teaCreator: string,

        public teaPwd: string,

        public teaTreatDate: Date,

        public teaCutOffDate: Date,

        public teaVisible: boolean,

        public teaMenu: string

) { }
}