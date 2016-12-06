<?php
namespace phMagick\Core;

class ActionMock extends Action
{

    public function getShellCommand()
    {

    }
}

/**
 * Test class for ActionCollection.
 * Generated by PHPUnit on 2011-12-11 at 20:50:05.
 */
class ActionCollectionTest extends \PHPUnit_Framework_TestCase
{
    /**
     * @var ActionCollection
     */
    protected $object;

    /**
     * Sets up the fixture, for example, opens a network connection.
     * This method is called before a test is executed.
     */

    protected function setUp()
    {
        $this->object = new ActionCollection();
        $this->action = new ActionMock(null,null);
    }

    /**
     * Tears down the fixture, for example, closes a network connection.
     * This method is called after a test is executed.
     */

    protected function tearDown()
    {
    }

    /**
     */

    public function testAdd()
    {
        $this->object
                ->add($this->action);
        $this->assertEquals(array($this->action), $this->object
                        ->getAll());
    }

    /**
     */

    public function testGet()
    {
        $this->object
                ->add($this->action);
        $this->assertEquals($this->action, $this->object
                        ->get(0));
    }
}
?>
