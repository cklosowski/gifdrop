<?php

class GifDrop_Options_Setting extends GifDrop_TestCase {
	function test_setting_option() {
		$p = $this->plugin();
		$this->assertEquals( null, $p->get_option( 'does_not_exist' ) );
		$p->set_option( 'does_not_exist', 'does now!' );
		$this->assertEquals( 'does now!', $p->get_option( 'does_not_exist' ) );
	}

	function test_default_option() {
		$this->assertEquals( 123, $this->plugin()->get_option( 'blah_fake', 123 ) );
	}
}
