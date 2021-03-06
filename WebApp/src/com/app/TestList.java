package com.app;
import java.util.ArrayList;
import java.util.Random;


public class TestList extends ArrayList<Object>
{

    /**
     * D1597A17A33.
     */
    private static final long serialVersionUID = 899149338534L;

    /**
     * Creats a TestList that is filled with 60 ListObjects suitable for testing.
     */
    public TestList()
    {
        super();

        for (int j = 0; j < 60; j++)
        {
            add(new ListObject());
        }
    }

    /**
     * Creates a TestList that is filled with [size] ListObjects suitable for testing.
     * @param size int size of the list
     * @param duplicates boolean put duplicates in the list
     */
    public TestList(int size, boolean duplicates)
    {
        if (duplicates)
        {
            // generate a random number between 1 and 3 and duplicate that many number of times.
            for (int j = 0; j < size; j++)
            {

                ListObject object1 = new ListObject();
                ListObject object2 = new ListObject();
                ListObject object3 = new ListObject();

                int random = new Random().nextInt(3);
                for (int k = 0; k <= random; k++)
                {
                    add(object1);
                }

                object1.setId(object2.getId());

                random = new Random().nextInt(3);
                for (int k = 0; k <= random; k++)
                {
                    add(object1);
                    add(object2);
                }

                object1.setEmail(object3.getEmail());

                random = new java.util.Random().nextInt(3);
                for (int k = 0; k <= random; k++)
                {
                    add(object1);
                }
            }
        }
        else
        {
            for (int j = 0; j < size; j++)
            {
                add(new ListObject());
            }
        }
    }

    /**
     * Returns a ListObject using get(index) from the Array.
     * @param index int index of the List object into the array
     * @return ListObject
     */
    public ListObject getItem(int index)
    {
        return (ListObject) super.get(index);
    }

}
