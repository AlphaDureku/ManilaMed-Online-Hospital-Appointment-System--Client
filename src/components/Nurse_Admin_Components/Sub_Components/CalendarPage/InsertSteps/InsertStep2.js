import { TextInput, Input, Radio, Group } from "@mantine/core";
import { DateInput } from '@mantine/dates';
import { IMaskInput } from "react-imask";


export default function InsertStep2 () {
    const formstyles = {
        input: {
          borderColor: "rgba(0, 0, 0, 0.5);",
          "&:focus": {
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
          },
        },
      };
    

    return (
        <div className="InsertAvailstep2-outContainer">
        
        <div className="insertStep2-Container">
        
        <Input.Wrapper label="First Name" withAsterisk>
        <TextInput
        styles={formstyles}
        />
        </Input.Wrapper>
          
        <Input.Wrapper label="Middle Name" className="mt-2" withAsterisk>
        <TextInput
        styles={formstyles}/>
        </Input.Wrapper>

        <Input.Wrapper label="Last Name" className="mt-2" withAsterisk>
        <TextInput
        styles={formstyles}/>
        </Input.Wrapper>

        <Input.Wrapper label="Email" className= "mt-2"withAsterisk>
        <TextInput
        styles={formstyles}
        />
        </Input.Wrapper>

        <Radio.Group
         label="Gender" className="mt-2" withAsterisk>
        <Group mt="xs">
            <Radio value="Male" label="Male" />
            <Radio value="Female" label="Female" />
        </Group>
         </Radio.Group>

        <Input.Wrapper label="Date of Birth" className="mt-2" withAsterisk>
            <DateInput
            styles={formstyles}/>
        </Input.Wrapper>

        <Input.Wrapper label="Contact Number" className="mt-2" withAsterisk>
        <Input
            component={IMaskInput}
            mask="+63 9000000000"
            styles={formstyles}
            />
        </Input.Wrapper>

        
        <Input.Wrapper label="Address" className="mt-2" withAsterisk>
        <TextInput
        styles={formstyles}/>
        </Input.Wrapper>

        </div>
        
        
        
        </div>

    );
}