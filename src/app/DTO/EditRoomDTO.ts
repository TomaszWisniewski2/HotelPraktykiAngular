export interface EditRoomDTO {
    id: number,
    token: string,
    roomNumber: number| undefined,
    roomPrice: number,
   roomCapacity: number,
   roomType:number,
   roomStatus: number
}