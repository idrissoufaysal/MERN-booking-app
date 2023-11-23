import { Alert, Snackbar } from "@mui/material";

export default function typeMessage({m,type,op,func}:{m:string,type:any,op:boolean,func:void}) {
    return <div>
        <Snackbar open={op} autoHideDuration={3000} onClose={() => func}>
     <Alert variant="filled" severity={type} sx={{ width: "100%" }}>
      {m}
     </Alert>
    </Snackbar>;
    </div>
}